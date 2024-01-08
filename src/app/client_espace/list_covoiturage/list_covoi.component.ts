import { AfterViewInit, Component, ElementRef, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { CovoiturageService } from 'src/app/covoiturage.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';


@Component({
  selector: 'app-root',
  templateUrl: './list_covoi.component.html',
  styleUrls: ['./list_covoi.component.css']
})
export class List_covoiturageComponent implements OnInit {
  departure: string = '';
  destination: string = '';
  date: string = '';
  covoiturages!: any[];
  username: string | undefined;

  // Add properties for userId and covoiturageId
  userId: string = '';
  covoiturageId: number = 0;
  map: L.Map | undefined; // Declare map property
  mapContainer: HTMLElement | null = null;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private covoiturageService: CovoiturageService,
    private keycloakService: KeycloakService,
    private zone: NgZone,
    private renderer: Renderer2

  ) {}



  private initMap(): void {
    try {
      // Wait for the map container to be fully rendered
      setTimeout(() => {
        if (!this.map) {
          this.zone.run(() => {
            this.mapContainer = this.renderer.createElement('div');
            this.renderer.setStyle(this.mapContainer!, 'height', '300px');

            const mapElement = document.getElementById('map');
            if (mapElement && this.mapContainer) {
              this.renderer.appendChild(mapElement, this.mapContainer);

              // Check the dimensions after a short delay to ensure rendering
              setTimeout(() => {
                const containerWidth = this.mapContainer!.offsetWidth;
                const containerHeight = this.mapContainer!.offsetHeight;

                console.log('Map Container Dimensions:', containerWidth, containerHeight);

                if (containerWidth > 0 && containerHeight > 0) {
                  this.map = L.map(this.mapContainer!).setView([34.853, 9.411], 7);

                  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors'
                  }).addTo(this.map);

                  Promise.all([
                    this.geocodeLocation(this.departure),
                    this.geocodeLocation(this.destination)
                  ])
                  .then(([departureCoords, destinationCoords]) => {
                    if (!departureCoords || !destinationCoords) {
                      console.error('Geocoding failed: Coordinates not found.');
                      return;
                    }

                    // Utilisez les coordonnées pour ajouter un marqueur de départ
                    L.marker(departureCoords).addTo(this.map!)
                      .bindPopup(this.departure)
                      .openPopup();

                    // Utilisez les coordonnées pour ajouter un marqueur de destination
                    L.marker(destinationCoords).addTo(this.map!)
                      .bindPopup(this.destination)
                      .openPopup();

                    // Ajoutez le contrôle de routage avec les waypoints
                    (L as any).routing.control({
                      waypoints: [
                        departureCoords, // Coordonnées de départ
                        destinationCoords // Coordonnées de destination
                      ],
                      routeWhileDragging: true
                    }).addTo(this.map!);
                  })
                  .catch(error => console.error('Geocoding error:', error));




                } else {
                  console.error('Map container dimensions are not valid.');
                }
              }, 100);
            }
          });
        }
      }, 100); // Adjust the delay as needed
    } catch (error) {
      console.error('Map initialization error:', error);
    }
  }

  private geocodeLocation(locationName: string): Promise<[number, number]> {
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}&countrycodes=TN`;

    return fetch(geocodeUrl)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const firstResult = data[0];
          return [parseFloat(firstResult.lat), parseFloat(firstResult.lon)];
        } else {
          throw new Error('Geocoding failed: No results found.');
        }
      });
  }




  ngOnInit(): void {
    this.getUsername();

    this.route.queryParams.subscribe((params: { [key: string]: string }) => {
      this.departure = params['departure'] || '';
      this.destination = params['destination'] || '';
      this.date = params['date'] || '';

      const keycloakInstance = this.keycloakService.getKeycloakInstance();

      if (keycloakInstance) {
        const userDetails = keycloakInstance.idTokenParsed;

        if (userDetails) {
          console.log('User Details:', userDetails);
          this.userId = userDetails['sub'] || '';
          console.log('Search Parameters:', this.departure, this.destination, this.date);
          this.searchCovoiturages();
          this.initMap(); // Initialize the map here

        } else {
          console.error('User details not found in the id token.');
        }
      } else {
        console.error('Keycloak instance not found.');
      }
    });


  }

  getUsername(): void {
    this.keycloakService.loadUserProfile().then((profile) => {
      this.username = profile.username;
    });
  }

  logout(): void {
    const redirectUri = window.location.origin + '/';
    console.log('Logout initiated. Redirect URI:', redirectUri);

    this.keycloakService.logout(redirectUri)
      .then(() => console.log('Logout successful'))
      .catch(error => console.error('Logout failed:', error));
  }

  searchCovoiturages(): void {
    this.covoiturageService.searchCovoiturages(this.departure, this.destination, this.date)
      .subscribe(
        data => {
          console.log('Fetched Covoiturages:', data);
          console.log('userId:', this.userId);
          this.covoiturages = data;
        },
        error => {
          console.error('Error fetching Covoiturages:', error);
        }
      );
  }

  confirmReservation(covoiturageId: number): void {
    this.covoiturageId = covoiturageId;

    this.covoiturageService.postConfirmation(this.userId, this.covoiturageId).subscribe(
      () => {
        console.log('Confirmation successful.');
      },
      error => {
        console.error('Error confirming reservation', error);
      }
    );
  }
}

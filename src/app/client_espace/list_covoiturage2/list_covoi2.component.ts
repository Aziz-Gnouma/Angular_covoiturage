import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { CovoiturageService } from 'src/app/covoiturage.service';
import { cov } from '../../cov';
import { reservation } from '../../reservation';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './list_covoi2.component.html',
  styleUrls: ['./list_covoi2.component.css']
})
export class List_covoiturage2Component implements OnInit {
  departure: string = '';
  destination: string = '';
  date: string = '';
  covoiturages: cov[] = [];
  username: string | undefined;
  reservations: reservation[] = [];
  combinedData: { reservation: reservation, covoiturage: cov }[] = [];
  // Add properties for userId and covoiturageId
  userId: string = '';
  covoiturageId: number = 0;

  constructor(private route: ActivatedRoute,
     private router: Router,
     private covoiturageService: CovoiturageService,

     private keycloakService: KeycloakService  // Inject KeycloakService
     ) {}

  ngOnInit(): void {
    this.getReservationsList();
    this.getUsername();
    // Retrieve the query parameters from the route
    this.route.queryParams.subscribe((params: { [key: string]: string }) => {
      this.departure = params['departure'] || '';
      this.destination = params['destination'] || '';
      this.date = params['date'] || '';

      // Fetch user information from Keycloak
      const keycloakInstance = this.keycloakService.getKeycloakInstance();

      if (keycloakInstance) {
        const userDetails = keycloakInstance.idTokenParsed;

        if (userDetails) {
          // Log the entire user details for debugging
          console.log('User Details:', userDetails);

          // Set userId from the user information
          this.userId = userDetails['sub'] || '';

          // Now you have the search parameters, you can perform your search logic here
          console.log('Search Parameters:', this.departure, this.destination, this.date);

          // Fetch covoiturages using search parameters

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
getReservationsList(): void {
    console.log('Fetching reservations...');
    this.covoiturageService.getResrvationsList().subscribe(
      (reservationData) => {
        console.log('Reservations data:', reservationData);

        // Assuming reservationData is an array of reservations
        const reservations: reservation[] = reservationData.map((data: any) => {
          // Create instances of the reservation class
          const res = new reservation();
          res.participationID = data.participationID;
          res.clientID = data.clientID;
          res.carpoolingID = data.carpoolingID;
          res.etat = data.etat;
          return res;
        });

        // Log all reservations
        console.log('All reservations:', reservations);

        // Filter reservations with clientID 3
   // Filter reservations with clientID 3
// Filter reservations with clientID 3
const clientReservations = reservations.filter(reservation => {
    console.log('Checking reservation with userId:', reservation.clientID);
    return reservation.clientID === this.userId;
});




        // Fetch all covoiturages associated with filtered reservations for client ID 3
        this.getAllCovoiturages(clientReservations);
      },
      (error) => {
        console.error('Error fetching reservations:', error);
      }
    );
  }
  getAllCovoiturages(clientReservations: reservation[]): void {
    console.log('Fetching covoiturages for client reservations:', clientReservations);
    // Fetch covoiturages associated with filtered reservations
    clientReservations.forEach(reservation => {
      this.covoiturageService.getCovoiturageById(reservation.carpoolingID).subscribe(
        (covoiturageData) => {
          const associatedCovoiturage: cov = covoiturageData;

          // Store the associated covoiturage data
          this.combinedData.push({
            reservation: reservation,
            covoiturage: associatedCovoiturage
          });

          // You may not need to update the covoiturages array separately
          this.covoiturages.push(associatedCovoiturage);

          // You can use combinedData for additional details
          console.log('Combined Data:', this.combinedData);
        },
        (error) => {
          console.error('Error fetching covoiturage details:', error);
        }
      );
    });
  }
  isCovoiturageObject(obj: any): obj is cov {
    return typeof obj === 'object' && obj !== null;
  }
  getEtatText(etat: number): string {
    switch (etat) {
      case 1:
        return 'WAITING...';
      case 2:
        return 'ACCEPTED';
      case 3:
        return 'REFUSED';
      default:
        return 'Unknown';
    }
  }

  getBackgroundColor(etat: number): string {
    return etat === 1 ? 'grey' : etat === 2 ? 'bleu' : 'red';
  }
  // Inside your component class
getTextColor(etat: number): string {
    return etat === 1 || etat === 2 ? 'white' : 'white';
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { CovoiturageService } from 'src/app/covoiturage.service';

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

  constructor(private route: ActivatedRoute,
     private router: Router,
     private covoiturageService: CovoiturageService,
     
     private keycloakService: KeycloakService  // Inject KeycloakService
     ) {}

  ngOnInit(): void {
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
          this.searchCovoiturages();
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
    // No need to format the date here since it's already in the correct format
    this.covoiturageService.searchCovoiturages(this.departure, this.destination, this.date)
      .subscribe(
        data => {
          // Log the data received
          console.log('Fetched Covoiturages:', data);
          console.log('userId:', this.userId);

          // Assign the retrieved covoiturages to the component property
          this.covoiturages = data;

          // You may want to navigate to the List_cov route here (commented for now)
          // this.router.navigate(['/List_cov']);
        },
        error => {
          // Log any error that occurs
          console.error('Error fetching Covoiturages:', error);
        }
      );
  }

  confirmReservation(covoiturageId: number): void {
    // Disable any UI elements if needed

    // Assign the covoiturageId to the component property
    this.covoiturageId = covoiturageId;

    // Make the confirmation request using userId and covoiturageId
    this.covoiturageService.postConfirmation(this.userId, this.covoiturageId).subscribe(
      () => {
        // Successful confirmation
        console.log('Confirmation successful.');
        // Navigate or handle success as needed
      },
      error => {
        // Handle unsuccessful confirmation
        console.error('Error confirming reservation', error);
        // Handle error and enable UI elements if needed
      }
    );
  }
}

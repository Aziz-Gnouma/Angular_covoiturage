   import { Component } from '@angular/core';
   import { user } from 'src/app/user';
   import { CovoiturageService } from 'src/app/covoiturage.service';
   import { Router } from '@angular/router';
   import { FormBuilder, FormGroup } from '@angular/forms';  // <-- Add this line
   import { CityService } from 'src/app/city.service';  // <-- Add this line
   import { KeycloakService } from 'keycloak-angular';


   @Component({
     selector: 'app-root',
     templateUrl: './client_acceuil.component.html',
     styleUrls: ['./client_acceuil.component.css']
   })
   export class Client_acceuilComponent {

    searchForm: FormGroup = new FormGroup({}); // Initialize the searchForm
    cities: string[] = [];  // <-- Add this line

     constructor(
       private covoiturageService: CovoiturageService,
       private router: Router,
       private formBuilder: FormBuilder,  // <-- Add this line
       private cityService: CityService,
       private keycloakService: KeycloakService  // <-- Add this line
     ) {}
     get isAuthenticated(): boolean {
      return this.keycloakService.isLoggedIn();
    }

     ngOnInit(): void {
       this.initForm();
       this.fetchCities();
     }

     initForm(): void {
       this.searchForm = this.formBuilder.group({
         source: '',
         destination: '',
       });
     }

     fetchCities(): void {
       this.cityService.getCities().subscribe(
         (cities) => {
           this.cities = cities;
         },
         (error) => {
           console.log('Failed to fetch cities', error);
         }
       );
     }



     // Handle form submission
     search(): void {
       // Get the search input values
       const departure = this.searchForm.get('source')?.value;
       const destination = this.searchForm.get('destination')?.value;
       const date = (document.getElementById('date') as HTMLInputElement).value;

       // Navigate to the /List_cov route with query parameters
       this.router.navigate(['/List_cov'], {
         queryParams: { departure, destination, date },
         queryParamsHandling: 'merge',
       });
     }
     search2(): void {
      this.router.navigate(['/List_cov2'], {

      });
    }
   }

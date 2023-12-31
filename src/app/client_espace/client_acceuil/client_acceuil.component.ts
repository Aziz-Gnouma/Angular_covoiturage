import { Component } from '@angular/core';
import { user } from 'src/app/user';
import { CovoiturageService } from 'src/app/covoiturage.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
        selector: 'app-root',
        templateUrl: './client_acceuil.component.html',
        styleUrls: ['./client_acceuil.component.css']
})
export class Client_acceuilComponent {
    title = 'projectv3';
    currentDate: string = '';
    currentTime: string = '';
    client: user | undefined; // Declare a variable to store the selected client
    clients: user[] = []; // Declare a variable to store the list of clients
    textColor: string = '';
    constructor(private covoiturageService: CovoiturageService , private keycloak: KeycloakService) {}

    ngOnInit(): void {
      this.updateDateTime();
      setInterval(() => {
        this.updateDateTime();
      }, 1000);
      this.getdrivers();
      this.updateTextColor(); // Initial update
      setInterval(() => {
        this.updateTextColor(); // Update every second
      }, 1000);
    }
  
    updateDateTime(): void {
      const now = new Date();
      
      // Format date without the day
      const optionsDate: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      this.currentDate = now.toLocaleDateString(undefined, optionsDate);
  
      // Format time
      const optionsTime: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
      this.currentTime = now.toLocaleTimeString(undefined, optionsTime);
    }
    getdrivers(): void {
        this.covoiturageService.getDriversList().subscribe(
          (data: user[]) => {
            this.clients = data;
    
            if (this.clients.length > 0) {
              // Set the selected client to the first client by default
              this.client = this.clients[0];
              console.log(this.client); // Use the selected client as needed
            } else {
              console.log('No clients available.');
            }
          },
          (error: any) => {
            console.log(error);
            // Handle request errors
          }
        );
      }
      updateTextColor(): void {
        const currentHour = new Date().getHours();
    
        if (currentHour >= 6 && currentHour < 12) {
          this.textColor = 'rgb(255, 0, 0)'; // Red color for morning
        } else if (currentHour >= 12 && currentHour < 18) {
          this.textColor = 'rgb(0, 255, 0)'; // Green color for afternoon
        } else {
          this.textColor = 'rgb(0, 0, 255)'; // Blue color for evening/night
        }
      }
   }
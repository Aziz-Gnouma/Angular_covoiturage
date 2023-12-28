import { Component, OnInit } from '@angular/core';
import { CovoiturageService } from '../../covoiturage.service';
import { Router } from '@angular/router';
import { reservation } from '../../reservation';
import { MdbModalService, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})

export class ReservationsComponent implements OnInit {
  res: any[] = []; // Replace any with the actual type of your data
  ok: any[] = []; // Replace any with the actual type of your data

  p: number = 1; // Current page
  nom!: string;
  searchText = '';
  selectedClientID!: number;
  covs:any;
  users:any;
  combinedData: {clientEmail?: any;clientName?: any; nomreservation?: any; clienteservation: any; idcov: any; departcovoiturage: any; destcovoiturage?: any; datecovoiturage?: any }[] = [];

x: any;
 dynamicDataArray: any[] = [];
matchingCovoiturage: any;
matchingUser:any;
  

  constructor(private CovoiturageService: CovoiturageService, 
    private router: Router, 
    private keycloak: KeycloakService ) {}

  ngOnInit(): void {
    this.getreservations();
    console.log('ressss : ' ,this.res);
    console.log("now " ,this.matchingCovoiturage)
    
    
  }

  setDefaultClientIDIfNotSet(clientID: number) {
    
      this.selectedClientID = clientID;
   
    console.log('selected :',this.selectedClientID);
  }

  getAndDisplayCarpoolingInfo(carpoolingId: number): void {
    this.CovoiturageService.getCovoiturageById(carpoolingId).subscribe(
      (carpoolingData) => {
        // Assuming carpoolingData contains the date information
        // Update your UI accordingly
        console.log(carpoolingData.date);
      },
      (error: any) => {
        console.error('Error fetching carpooling information', error);
      }
    );
  }


  view(id: number)
  {
    this.router.navigate(['view',id]);
  }




  private getreservations() {
    this.CovoiturageService.getResrvationsList().subscribe((data: any[]) => {
      this.res = data;
  
      // Declare an array to store dynamic data
   
  
      /*for (let i = 0; i < this.res.length; i++) {
        const id = this.res[i].carpoolingID;
        //console.log(id);
          this.CovoiturageService.getCovoiturageById(id).subscribe(
          (carpoolingData) => {
          
            //console.log(carpoolingData.date);
            this.dynamicDataArray.push(carpoolingData);
          });
      }
  
      // Now 'dynamicDataArray' contains all the data you collected
      console.log('tab',this.dynamicDataArray);*/
      console.log('res',this.res);
  
      this.p = 1;
    });
    this.CovoiturageService.getUsersList().subscribe((data: any) => {
      this.users=data;
      console.log('users',this.users);});
      
    this.CovoiturageService.getCovoituragesList().subscribe((data: any[]) => {
      this.ok=data;
      console.log('cov',this.ok);

      
      this.combineData();

      console.log('Combined Data:', this.combinedData);
    })
  }
  
  combineData() {
    this.combinedData = this.res.map(reservation => {
      const matchingCovoiturage = this.ok.find(c => c.id === reservation.carpoolingID) ;
      const matchingUser = this.users.find((u: { id: any; }) => u.id === reservation.clientID);
      if (matchingCovoiturage && matchingUser) {
        return {
          nomreservation: reservation.participationID,
          clienteservation: reservation.clientID,
          idcov: reservation.carpoolingID,
          departcovoiturage: matchingCovoiturage.depart,
          destcovoiturage: matchingCovoiturage.destination,
          datecovoiturage: matchingCovoiturage.date,
          clientName: matchingUser.name,
          clientEmail: matchingUser.email,
        };
      }
  
      return {
        nomreservation: reservation.participationID,
        clienteservation: 'N/A', // or any default value you want to use
        idcov: reservation.carpoolingID,
        departcovoiturage: 'N/A',
      };
    });
  
    console.log('Combined Data:', this.combinedData);
  }
  
  
  
  
 
  deleteReservation(id: number) {
    this.CovoiturageService.deleteReservation(id).subscribe((data: any) => {
      console.log(data);
      this.getreservations(); // Correction ici
    });
  }
  

  onAcceptClick(email: string, idCovoiturage: number, nameClient: string) {

    if (email && nameClient && idCovoiturage) {
      
      const queryParams = `email=${email}&nameClient=${nameClient}&idCovoiturage=${idCovoiturage}`;
  
      this.CovoiturageService.sendEmail(queryParams).subscribe(
        (response: any) => {
          console.log('Email sent successfully', response);
          // Add logic to update etat carpooling if needed
        },
        (error: any) => {
          console.error('Error sending email', error);
          // Log the error details for debugging
        }
      );
    } else {
      console.error('Invalid values for email, nameClient, or idCovoiturage');
    }
  }
  
  logout(): void {
   
    this.keycloak.clearToken();
    
 
    this.keycloak.logout('http://localhost:4200/'); 
  }
  
 
}

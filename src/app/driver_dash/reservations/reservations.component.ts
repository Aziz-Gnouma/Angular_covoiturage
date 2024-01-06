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
  username: string | undefined; 
  users:any;
  reservation: reservation = new reservation();
  combinedData: {clientEmail?: any;clientName?: any; nomreservation?: any; clienteservation: any; idcov: any; departcovoiturage: any; destcovoiturage?: any; datecovoiturage?: any ;Etatreservation?: any  }[] = [];
  IDdriver: string | undefined;

x: any;
 dynamicDataArray: any[] = [];
matchingCovoiturage: any;
matchingUser:any;
  

  constructor(private keycloakService: KeycloakService ,private CovoiturageService: CovoiturageService, private router: Router ) {}

  ngOnInit(): void {
    this.getreservations();
    this.getUsername1();
    console.log('ressss : ' ,this.res);
    console.log("now " ,this.matchingCovoiturage)
 

  this.getUsername();
}
getUsername1(): void {
  this.keycloakService.loadUserProfile().then((profile) => {
    this.username = profile.username;
  });
}
getUsername(): void {
  this.keycloakService.loadUserProfile().then((profile) => {
    this.IDdriver = profile.id;
    if (this.IDdriver) {
      this.getreservations();
    } else {
      // Handle the case where IDdriver is undefined
      console.error('IDdriver is undefined');
    }
  });
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
      (error) => {
        console.error('Error fetching carpooling information', error);
      }
    );
  }


  view(id: number)
  {
    this.router.navigate(['view',id]);
  }




  private getreservations() {
    this.CovoiturageService.getResrvationsList().subscribe(data => {
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
    this.CovoiturageService.getUsersList().subscribe(data => {
      this.users=data;
      console.log('users',this.users);});

      if (this.IDdriver) {
    this.CovoiturageService.getCovoituragesListByIdDriver(this.IDdriver).subscribe(data => {
      this.ok=data;
      console.log('cov',this.ok);
    
      
      this.combineData();

      console.log('Combined Data:', this.combinedData);
    })}
  }
  
  combineData() {
    this.combinedData = this.res.map(reservation => {
      const matchingCovoiturage = this.ok.find(c => c.id === reservation.carpoolingID);
      const matchingUser = this.users.find((u: { id: any; }) => u.id === reservation.clientID);
  
      if (matchingCovoiturage && matchingUser) {
        return {
          nomreservation: reservation.participationID,
          Etatreservation: reservation.etat,
          clienteservation: reservation.clientID,
          idcov: reservation.carpoolingID,
          departcovoiturage: matchingCovoiturage.depart,
          destcovoiturage: matchingCovoiturage.destination,
          datecovoiturage: matchingCovoiturage.date,
          clientName: matchingUser.name,
          clientEmail: matchingUser.email,
        } as {
          nomreservation: any;
          Etatreservation: any;
          clienteservation: any;
          idcov: any;
          departcovoiturage: any;
          destcovoiturage?: any;
          datecovoiturage?: any;
          clientName?: any;
          clientEmail?: any;
        };
      }
  
      // If the condition is not met, return null
      return null;
    })
    .filter(combinedObject => combinedObject !== null) as {
      nomreservation: any;
      Etatreservation: any;
      clienteservation: any;
      idcov: any;
      departcovoiturage: any;
      destcovoiturage?: any;
      datecovoiturage?: any;
      clientName?: any;
      clientEmail?: any;
    }[];
  
    console.log('Combined Data:', this.combinedData);
  }
  
  logout(): void {
    const redirectUri = window.location.origin + '/'; // Use the correct path
    this.keycloakService.logout(redirectUri);
  }
  
  
  
 
  deleteReservation(id: number) {
    this.CovoiturageService.deleteReservation(id).subscribe(data => {
      console.log(data);
      this.getreservations(); // Correction ici
    });
  }

  UpdateReservation(id: number, newEtat: number) {
    // Assuming this.reservation is defined and has an 'etat' property
    const updatedReservation: reservation = { ...this.reservation, etat: newEtat };
  
    this.CovoiturageService.updateReservation(id, updatedReservation).subscribe(
      (data: reservation) => {
        console.log('Reservation updated successfully', data);
  
        // You can perform additional actions after updating the reservation here
      },
      (error) => {
        console.error('Error updating reservation', error);
  
        // Handle specific error cases, if needed
        if (error.status === 404) {
          console.error('Reservation not found');
        } else {
          console.error('Unexpected error occurred');
        }
      }
    );
  }
  
  
  onAcceptClick(email: string, idCovoiturage: number, nameClient: string, reservationId: number) {
    const newEtat = 2;
  
    this.UpdateReservation(reservationId, newEtat);
  
    if (email && nameClient && idCovoiturage) {
      const queryParams = `email=${email}&nameClient=${nameClient}&idCovoiturage=${idCovoiturage}`;
  
      this.CovoiturageService.sendEmail(queryParams).subscribe(
        (response) => {
          console.log('Email sent successfully', response);
          // Add logic to update etat carpooling if needed
        },
        (error) => {
          console.error('Error sending email', error);
          // Log the error details for debugging
        }
      );
    } else {
      console.error('Invalid values for email, nameClient, or idCovoiturage');
    }
  }
  
  
  
  
 
}

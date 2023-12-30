import { Component, OnInit } from '@angular/core';
import { CovoiturageService } from '../../covoiturage.service';
import { Router } from '@angular/router';
import { cov } from '../../cov';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-list-cov',
  templateUrl: './list-cov.component.html',
  styleUrls: ['./list-cov.component.css']
})
export class ListCovComponent implements OnInit {
  covs: cov[] = [];
  p: number = 1;
  nom!: string;
  searchText = '';
  x: { [id: number]: number } = {};
  count!: Number ;
  y!: number ;
  okk: any ;
  users:any;
  combinedData: {clientEmail?: any;clientName?: any; nomreservation?: any; clienteservation: any; idcov: any; departcovoiturage: any; destcovoiturage?: any; datecovoiturage?: any }[] = [];

  res: any[] = [];
  aziz: any;
  IDdriver: string | undefined;



  constructor(private keycloakService: KeycloakService , private CovoiturageService: CovoiturageService, private router: Router,   
  ) {}

  get isAuthenticated(): boolean {
      return this.keycloakService.isLoggedIn();
  }
  ngOnInit(): void {
    this.getCovoiturages();
  
    this.getUsername();
  }
  
  getUsername(): void {
    this.keycloakService.loadUserProfile().then((profile) => {
      this.IDdriver = profile.id;
      if (this.IDdriver) {
        this.getCovoiturages();
      } else {
        // Handle the case where IDdriver is undefined
        console.error('IDdriver is undefined');
      }
    });
  }

private getCovoiturages() {
  if (this.IDdriver) {
    this.CovoiturageService.getCovoituragesListByIdDriver(this.IDdriver).subscribe(data => {
      this.covs = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.p = 1;
    });

    this.CovoiturageService.getUsersList().subscribe(data => {
      this.users = data;
      console.log('users', this.users);
    });

    this.CovoiturageService.getReservationsEtat().subscribe(data => {
      this.res = data;
      console.log('res', this.res);
      this.combineData();
      console.log('Combined Data:', this.combinedData);
    });
  } else {
    // Handle the case where IDdriver is undefined
    console.error('IDdriver is undefined');
  }
}


combineData() {
  // Initialize an empty array to store combined data
  const combinedData: any[] = [];

  // Iterate over each reservation in the 'res' array
  this.res.forEach(reservation => {
    const matchingCovoiturage = this.covs.find(c => c.id === reservation.carpoolingID);
    const matchingUser = this.users.find((u: { id: any }) => u.id === reservation.clientID);

    if (matchingCovoiturage && matchingUser) {
      // Create a combined object
      const combinedObject = {
        nomreservation: reservation.participationID,
        clienteservation: reservation.clientID,
        idcov: reservation.carpoolingID,
        departcovoiturage: matchingCovoiturage.depart,
        destcovoiturage: matchingCovoiturage.destination,
        dhcovoiturage: matchingCovoiturage.heureDepart,
        dacovoiturage: matchingCovoiturage.heureArrive,
        datecovoiturage: matchingCovoiturage.date,
        clientName: matchingUser.name,
        clientEmail: matchingUser.email,
      };
      
      // Push the combined object to the array
      combinedData.push(combinedObject);
    }
  });
  this.y=combinedData.length
  // Log the combined data
  console.log('Combined Data:', combinedData);

  // Assign the combined data to a class property if needed
  this.combinedData = combinedData;
  console.log('Combined length:', this.y);
}


  
   getCOUNT( id: number) {
    this.CovoiturageService.getReservationsCount(id).subscribe(data => {
      console.log(data)
      return data ;
      
    });
  }

  logout(): void {
    const redirectUri = window.location.origin + '/'; // Use the correct path
    this.keycloakService.logout(redirectUri);
  }


  updateCovoiturage(id: number) {
    this.router.navigate(['Update-cov', id]);
  }

  deleteCovoiturage(id: number) {
    this.CovoiturageService.deleteCovoiturage(id).subscribe(data => {
      console.log(data);
      this.getCovoiturages();
    });
  }

  getCovoituragesbyNom(nom: string) {
    this.CovoiturageService.getCovoituragetByNom(nom).subscribe(data => {
      //this.covs = data;
    });
  }

  isDateValid(prodDate: Date | string): boolean {
    const currentDate = new Date();
    
    // Parse the date string in the format "DD-MM-YYYY"
    const [day, month, year] = (typeof prodDate === 'string' ? prodDate : '').split('-');
    const productDate = new Date(`${year}-${month}-${day}`);

    console.log('Current Date:', currentDate);
    console.log('Product Date:', productDate);

    return !isNaN(productDate.getTime()) && productDate >= currentDate;
}
  
}

import { Component, OnInit } from '@angular/core';
import { CovoiturageService } from '../../covoiturage.service';
import { cov } from 'src/app/cov';
import { KeycloakService } from 'keycloak-angular';
import {AuthGuard} from '../../keycloak-init/AuthGuard'

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
   ok: any ;
   ok2: any;
   ok3:any;
   constructor(
    private CovoiturageService: CovoiturageService,
    private keycloakService: KeycloakService
  ) {}


  ngOnInit(): void {
    this.getCovoiturages();
    console.log(this.ok);
    this.getReservation() ;
    this.getReservationAnnuled() ;
  }

  private getCovoiturages() {
    this.CovoiturageService.counts().subscribe((data: any) => {
      this.ok = data;
    });
  }
  private getReservation() {
    this.CovoiturageService.counts2().subscribe((data: any) => {
      this.ok2 = data;
    });
  }

  private getReservationAnnuled() {
    this.CovoiturageService.counts3().subscribe((data: any) => {
      this.ok3 = data;
    });
  }
  logout(): void {
   
    this.keycloakService.clearToken();
    
 
    this.keycloakService.logout('http://localhost:4200/'); 
  }
}

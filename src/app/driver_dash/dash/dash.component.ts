import { Component, OnInit } from '@angular/core';
import { CovoiturageService } from '../../covoiturage.service';
import { cov } from 'src/app/cov';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
   ok: any ;
   ok2: any;
   ok3:any;
   username: string | undefined; // Replace 'undefined' with the actual type if known
   constructor(private keycloakService: KeycloakService , private CovoiturageService: CovoiturageService) {}

   get isAuthenticated(): boolean {
    return this.keycloakService.isLoggedIn();
  }

  ngOnInit(): void {
    this.getUsername();
    this.getCovoiturages();
    console.log(this.ok);
    this.getReservation() ;
    this.getReservationAnnuled() ;
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


 
  

  private getCovoiturages() {
    this.CovoiturageService.counts().subscribe(data => {
      this.ok = data;
    });
  }
  private getReservation() {
    this.CovoiturageService.counts2().subscribe(data => {
      this.ok2 = data;
    });
  }

  private getReservationAnnuled() {
    this.CovoiturageService.counts3().subscribe(data => {
      this.ok3 = data;
    });
  }
}

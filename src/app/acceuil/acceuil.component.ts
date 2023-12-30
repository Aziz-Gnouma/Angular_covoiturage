// acceuil.component.ts
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { initializeKeycloak } from '../keycloak-init/keycloak-init.module';
import { Register } from '../model/user.model';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['assets/css/JiSlider.css', 'assets/css/bootstrap.css', 'assets/css/flexslider.css', 'assets/css/font-awesome.css', 'assets/css/style.css']
})
export class AcceuilComponent implements OnInit {
  userInformation: Register | undefined;

  constructor(private keycloak: KeycloakService, private router: Router , private authService : ApiService) {}

  async ngOnInit(): Promise<void> {}

  async initKeycloak(): Promise<void> {
    await initializeKeycloak(this.keycloak, this.router)();
    const userDetails = await this.keycloak.loadUserProfile();

    const userId = userDetails?.id;
    const userEmail = userDetails?.email;
    const userName = userDetails?.username;

    const roles = this.keycloak.getUserRoles();

    this.userInformation = {
      id: userId || '',
      password: '', 
      name: userName || '',
      email: userEmail || '',
      roleName: roles.length > 0 ? roles[0] : '', 
    };

    console.log('User Information:', this.userInformation);
    this.authService.signUp(this.userInformation).subscribe(
      (response) => {
        console.log('Inscription réussie:', response);
      },
      (error) => {
        console.error('Erreur lors de linscription:', error);
      }
    );

    if (roles.includes('ADMIN')) {
      this.router.navigate(['/dashadmin']);
    } else if (roles.includes('DRIVER')) {
      this.router.navigate(['/dash']);
    } else if (roles.includes('CLIENT')) {
      this.router.navigate(['/reservation']);
    } else {
      this.router.navigate(['/']);
    }
  }
}

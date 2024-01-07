// acceuil.component.ts
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { initializeKeycloak } from '../keycloak-init/keycloak-init.module';
import { Register } from '../model/user.model';
import { ApiService } from '../service/api.service';
import { checkRoles } from '../keycloak-init/keycloak-util';  // Import the checkRoles function


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
    // Initialize Keycloak
    await initializeKeycloak(this.keycloak, this.router)();

  }
}



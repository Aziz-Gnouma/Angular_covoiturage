import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { initializeKeycloak } from '../keycloak-init/keycloak-init.module';
@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['assets/css/imagehover.css','./service-page.component.css','assets/css/JiSlider.css', 'assets/css/bootstrap.css', 'assets/css/flexslider.css', 'assets/css/font-awesome.css', 'assets/css/style.css']
})
export class ServicePageComponent {


  constructor(private keycloak: KeycloakService, private router: Router) {}

  async ngOnInit(): Promise<void> {
  
  }
  async initKeycloak(): Promise<void> {
    
    await initializeKeycloak(this.keycloak, this.router)();
    const userDetails = await this.keycloak.loadUserProfile();
    console.log('User Details:', userDetails);


    const roles = this.keycloak.getUserRoles();

    
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

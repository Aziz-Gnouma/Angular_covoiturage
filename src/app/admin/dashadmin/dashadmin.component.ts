import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-dashadmin',
  templateUrl: './dashadmin.component.html',
  styleUrls: ['./dashadmin.component.css']
})
export class DashadminComponent {
  constructor(private keycloak: KeycloakService) {}

  ngOnInit(): void {
   
  }

  logout(): void {
   
    this.keycloak.clearToken();
    
 
    this.keycloak.logout('http://localhost:4200/'); 
  }
}

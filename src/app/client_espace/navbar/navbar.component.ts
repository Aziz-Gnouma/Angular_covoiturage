// navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/navbar.service';
import { KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  constructor(private navbarService: NavbarService,
    private keycloakService: KeycloakService  // <-- Add this line
    ) {}

    get isAuthenticated(): boolean {
      return this.keycloakService.isLoggedIn();
    }

  logout(): void {
    const redirectUri = window.location.origin + '/'; // Use the correct path
    this.keycloakService.logout(redirectUri);
  }

  ngOnInit(): void {
    this.navbarService.isAuthenticated$.subscribe(() => {
    });
  }
}

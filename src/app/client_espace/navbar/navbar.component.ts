// navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/navbar.service';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  username: string | undefined; 

  constructor(private navbarService: NavbarService,
    private router: Router,
    private keycloakService: KeycloakService  // <-- Add this line
    ) {}

    get isAuthenticated(): boolean {
      return this.keycloakService.isLoggedIn();
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

  ngOnInit(): void {
    this.getUsername();
    this.navbarService.isAuthenticated$.subscribe(() => {
    });
  }
  search2(): void {
    this.router.navigate(['/List_cov2'], {

    });
  }
}

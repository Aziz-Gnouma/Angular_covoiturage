import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { CovoiturageService } from 'src/app/covoiturage.service';
import { user } from 'src/app/user';

@Component({
  selector: 'app-list-driver',
  templateUrl: './list-driver.component.html',
  styleUrls: ['./list-driver.component.css']
})
export class ListDriverComponent {
  drivers: user[] = []; // Déclaration d'une variable pour stocker la liste des conducteurs
  username: string | undefined; 
  constructor(private keycloakService: KeycloakService ,private covoiturageService: CovoiturageService,private keycloak: KeycloakService) {}

  ngOnInit() {
    this.getUsername();
    this.getDrivers(); // Appel de la méthode pour récupérer les conducteurs au chargement du composant
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

  getDrivers(): void {
    this.covoiturageService.getDriversList().subscribe(
      (data: user[]) => {
        this.drivers = data;
      },
      (error: any) => {
        console.log(error);
        // Gérer les erreurs de requête
      }
    );
  }
  deleteDriver(id: number) {
    const confirmed = confirm('Are you sure you want to delete this driver?');
    if (confirmed) {
      this.covoiturageService.deleteDriver(id).subscribe(
        () => {
          // Suppression réussie : Mettez à jour la liste des conducteurs après la suppression
          this.getUpdatedDriversList();
        },
        (  error: any) => {
          console.log('Error deleting driver:', error);
          // Gérer les erreurs de suppression
        }
      );
    }
  }
  getUpdatedDriversList(): void {
    this.covoiturageService.getDriversList().subscribe(
      (data: user[]) => {
        this.drivers = data; 
      },
      (error: any) => {
        console.log(error);
        // Gérer les erreurs de requête
      }
    );
  }
  
}
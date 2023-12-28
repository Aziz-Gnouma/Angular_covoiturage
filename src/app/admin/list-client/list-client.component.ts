import { Component } from '@angular/core';
import { user } from 'src/app/user';
import { CovoiturageService } from 'src/app/covoiturage.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent {
  clients: user[] = []; // Déclaration d'une variable pour stocker la liste des conducteurs

  constructor(private covoiturageService: CovoiturageService , private keycloak: KeycloakService) {}

  ngOnInit() {
    this.getClients(); // Appel de la méthode pour récupérer les conducteurs au chargement du composant
  }

  getClients(): void {
    this.covoiturageService.getClientsList().subscribe(
      (data: user[]) => {
        this.clients = data;
        console.log(this.clients); // Utilisez les données récupérées selon vos besoins
      },
      (error: any) => {
        console.log(error);
        // Gérer les erreurs de requête
      }
    );
  }
  deleteClient(id: number) {
    const confirmed = confirm('Are you sure you want to delete this Client?');
    if (confirmed) {
      this.covoiturageService.deleteClient(id).subscribe(
        () => {
          // Suppression réussie : Mettez à jour la liste des conducteurs après la suppression
          this.getClients();
        },
        ( error: any) => {
          console.log('Error deleting driver:', error);
          // Gérer les erreurs de suppression
        }
      );
    }
  }
  logout(): void {
    this.keycloak.logout();
  }
}

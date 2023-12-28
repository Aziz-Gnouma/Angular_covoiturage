import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { cov } from 'src/app/cov';
import { CovoiturageService } from 'src/app/covoiturage.service';

@Component({
  selector: 'app-list-covi',
  templateUrl: './list-covi.component.html',
  styleUrls: ['./list-covi.component.css']
})
export class ListCoviComponent {
  covoiturages: any[] = [];
  drivers: any[] = []; // Liste des conducteurs
  participants: any[] = [];

  constructor(private covoiturageService: CovoiturageService , private keycloak: KeycloakService) { }

  ngOnInit(): void {
    this.getCovoiturages();
    this.getDrivers();
  }

  getCovoiturages(): void {
    this.covoiturageService.getCovoituragesList().subscribe(
      (data: any[]) => {
        this.covoiturages = data;
        this.mapDriversToCovoiturages();
        this.fetchParticipantsAndClients();
        // Met à jour les noms des conducteurs
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getDrivers(): void {
    this.covoiturageService.getDriversList().subscribe(
      (data: any[]) => {
        this.drivers = data;
        this.mapDriversToCovoiturages(); // Met à jour les noms des conducteurs une fois que les conducteurs sont récupérés
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  mapDriversToCovoiturages(): void {
    // Vérifie si les deux tableaux sont récupérés
    if (this.covoiturages.length > 0 && this.drivers.length > 0) {
      this.covoiturages.forEach((covoiturage) => {
        const driver = this.drivers.find((driver) => driver.id === covoiturage.driver);
        if (driver) {
          covoiturage.driverName = driver.name; // Associe le nom du conducteur au covoiturage correspondant
        }
      });
    }
  }
  fetchParticipantsAndClients(): void {
    this.covoiturages.forEach((covoiturage) => {
      this.covoiturageService.getParticipantsForCovoiturage(covoiturage.id).subscribe(
        (participants: any | any[]) => {
          const participantsList: any[] = []; // Crée une liste de participants distincte pour chaque covoiturage
  
          if (Array.isArray(participants)) {
            participants.forEach((participant) => {
              this.covoiturageService.getClientById(participant.clientID).subscribe(
                (user: any) => {
                  participant.clientInfo = user; // Associez les informations du client au participant
                  participantsList.push(participant); // Ajoutez le participant à la liste de participants
                },
                (error: any) => {
                  console.error(error);
                }
              );
            });
          } else if (typeof participants === 'object') {
            this.covoiturageService.getClientById(participants.clientID).subscribe(
              (user: any) => {
                participants.clientInfo = user;
                participantsList.push(participants); // Ajoutez le participant à la liste de participants
              },
              (error: any) => {
                console.error(error);
              }
            );
          } else {
            console.error('Unknown type for participants:', participants);
          }
  
          // Une fois que tous les participants sont récupérés, assignez la liste de participants au covoiturage correspondant
          covoiturage.participants = participantsList;
        },
        (error: any) => {
          console.error(error);
        }
      );
    });
  }
  deleteCovoiturage(id: number): void {
    const confirmed = confirm('Êtes-vous sûr de vouloir supprimer ce covoiturage ?');
    if (confirmed) {
      this.covoiturageService.deleteCovoiturageById(id).subscribe(
        () => {
          console.log('Covoiturage supprimé avec succès');
          // Actualise la liste après la suppression si nécessaire
          this.getCovoiturages();
        },
        (error: any) => {
          console.error('Erreur lors de la suppression du covoiturage', error);
        }
      );
    }
  }
  logout(): void {
   
    this.keycloak.clearToken();
    
 
    this.keycloak.logout('http://localhost:4200/'); 
  }
}
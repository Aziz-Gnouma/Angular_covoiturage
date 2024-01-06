import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { KeycloakService } from 'keycloak-angular';
import { CovoiturageService } from 'src/app/covoiturage.service';

@Component({
  selector: 'app-dashadmin',
  templateUrl: './dashadmin.component.html',
  styleUrls: ['./dashadmin.component.css']
})
export class DashadminComponent implements OnInit {
  numberOfDrivers: number = 0;
  numberOfClients: number = 0;
  totalCovoiturages: number = 0;
  totalParticipants: number = 0;

  constructor(private keycloak: KeycloakService, private covoiturageService: CovoiturageService) {
    Chart.register(...registerables); // Enregistrez les plugins nécessaires pour Chart.js
  }

  ngOnInit(): void {
    this.getDriversCount();
    this.getClientsCount();
    this.getCovoituragesCount();
    this.getTotalParticipants();
  }

  getDriversCount(): void {
    this.covoiturageService.getDriversList().subscribe(
      (drivers) => {
        this.numberOfDrivers = drivers.length;
        this.updateChart(); // Mettez à jour le graphique lorsque vous avez récupéré les données
      },
      (error) => {
        console.error('Erreur lors de la récupération des conducteurs : ', error);
      }
    );
  }

  getClientsCount(): void {
    this.covoiturageService.getClientsList().subscribe(
      (clients) => {
        this.numberOfClients = clients.length;
        this.updateChart(); // Mettez à jour le graphique lorsque vous avez récupéré les données
      },
      (error) => {
        console.error('Erreur lors de la récupération des clients : ', error);
      }
    );
  }

  getCovoituragesCount(): void {
    this.covoiturageService.getCovoituragesCount().subscribe(
      (count) => {
        this.totalCovoiturages = count;
        this.updateChart(); // Mettez à jour le graphique lorsque vous avez récupéré les données
      },
      (error) => {
        console.error('Erreur lors de la récupération du nombre total de covoiturages : ', error);
      }
    );
  }

  getTotalParticipants() {
    this.covoiturageService.getTotalParticipations().subscribe(
      (data: any) => {
        this.totalParticipants = data.totalParticipants;
        this.updateChart(); // Mettez à jour le graphique lorsque vous avez récupéré les données
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  updateChart() {
    // Utilisez les données mises à jour pour alimenter le graphique
    const ctx = document.getElementById('chartBar1') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Total Carpoolings', 'Total Drivers', 'Total Clients', 'Total Participants'],
        datasets: [{
          label: 'Statistics',
          data: [this.totalCovoiturages, this.numberOfDrivers, this.numberOfClients, this.totalParticipants],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  logout(): void {
    this.keycloak.clearToken();
    this.keycloak.logout('http://localhost:4200/');
  }
}

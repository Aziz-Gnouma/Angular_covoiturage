import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CovoiturageService } from 'src/app/covoiturage.service';

@Component({
  selector: 'app-root',
  templateUrl: './list_covoi.component.html',
  styleUrls: ['./list_covoi.component.css']
})
export class List_covoiturageComponent implements OnInit {
  departure: string = '';
  destination: string = '';
  date: string = '';
  covoiturages!: any[];

  constructor(private route: ActivatedRoute, private router: Router, private covoiturageService: CovoiturageService) {}

  ngOnInit(): void {
    // Retrieve the query parameters from the route
    this.route.queryParams.subscribe((params: { [key: string]: string }) => {
      this.departure = params['departure'] || '';
      this.destination = params['destination'] || '';
      this.date = params['date'] || '';

      // Now you have the search parameters, you can perform your search logic here
      console.log('Search Parameters:', this.departure, this.destination, this.date);
      this.searchCovoiturages();
    });
  }

  searchCovoiturages(): void {
    // No need to format the date here since it's already in the correct format
    this.covoiturageService.searchCovoiturages(this.departure, this.destination, this.date)
      .subscribe(
        data => {
          // Log the data received
          console.log('Fetched Covoiturages:', data);

          // Assign the retrieved covoiturages to the component property
          this.covoiturages = data;

          // Navigate to the List_cov route here (commented for now)
          // this.router.navigate(['/List_cov']);
        },
        error => {
          // Log any error that occurs
          console.error('Error fetching Covoiturages:', error);
        }
      );
  }

 /* formatDate(date: string): string {
    // Assuming date is in the format YYYY-MM-DD
    const parts = date.split('-');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  */

/*  confirmReservation() {
    // Disable any UI elements if needed

    this.covoiturageService.postConfirmation(this.userId, this.covoiturageId).subscribe(
      () => {
        // Successful confirmation
        console.log('Confirmation successful.');
        // Navigate or handle success as needed
      },
      error => {
        // Handle unsuccessful confirmation
        console.error('Error confirming reservation', error);
        // Handle error and enable UI elements if needed
      }
    );
  }
*/

}

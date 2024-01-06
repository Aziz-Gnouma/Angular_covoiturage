import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CovoiturageService } from '../../covoiturage.service';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-cov',
  templateUrl: './create-cov.component.html',
  styleUrls: ['./create-cov.component.css']
})
export class CreateCovComponent implements OnInit {

  prodForm: FormGroup;
  username: string | undefined; 
  driver: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private CovoiturageService: CovoiturageService,
    private router: Router,
    private keycloakService: KeycloakService
  ) {
    this.prodForm = this.formBuilder.group({
      depart: ['', Validators.required],
      destination: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      phone: ['', Validators.required],
      marque:['', Validators.required],
      heureDepart: ['', Validators.required],
      heureArrive:['', Validators.required],
      bagage: ['', Validators.required],
      place: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0), Validators.max(1000)]],
    });
  }

  ngOnInit(): void {
    this.getUsername();
    this.getUsername1();

  }

  getUsername1(): void {
    this.keycloakService.loadUserProfile().then((profile) => {
      this.username = profile.username;
    });
  }
  getUsername(): void {
    this.keycloakService.loadUserProfile().then((profile) => {
      this.driver = profile.id;
    });
  }

  saveCovoiturage() {
    if (!this.driver) {
      console.error('Driver ID is not available.');
      // Display a user-friendly error message or disable the submit button
      return;
    }
    

 // Ensure date is in the correct format (adjust this according to your needs)
    const covoiturageData = { ...this.prodForm.value, idDriver: String(this.driver) };

    this.CovoiturageService.createCovoiturage(covoiturageData).subscribe(
      data => {
        console.log('Covoiturage created successfully', data);
        this.goToECovoiturageList();
      },
      error => {
        console.error('Error creating covoiturage', error);
        if (error instanceof HttpErrorResponse) {
          console.error('Status:', error.status);
          console.error('Body:', error.error);
        }
        // Display additional error messages in the UI if needed
      }
    );
  }
  logout(): void {
    const redirectUri = window.location.origin + '/'; // Use the correct path
    this.keycloakService.logout(redirectUri);
  }
  goToECovoiturageList() {
    this.router.navigate(['/list']);
  }

  onSubmit() {
    if (this.prodForm.valid) {
      console.log(this.prodForm.value);
      this.saveCovoiturage();
    }
  }
}

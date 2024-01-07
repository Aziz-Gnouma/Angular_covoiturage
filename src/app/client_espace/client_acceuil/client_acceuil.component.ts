import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CovoiturageService } from 'src/app/covoiturage.service';
import { Router } from '@angular/router';
import { CityService } from 'src/app/city.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-client-acceuil',
  templateUrl: './client_acceuil.component.html',
  styleUrls: ['./client_acceuil.component.css'],
})
export class Client_acceuilComponent implements OnInit {
  searchForm!: FormGroup;
  cities: string[] = [];

  filteredSourceOptions!: Observable<string[]>;
  filteredDestinationOptions!: Observable<string[]>;

  constructor(
    private covoiturageService: CovoiturageService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private keycloakService: KeycloakService
  ) {}

  get isAuthenticated(): boolean {
    return this.keycloakService.isLoggedIn();
  }

  ngOnInit(): void {
    this.initForm();
    this.fetchCities();
    this.setupAutocomplete();
  }

  initForm(): void {
    this.searchForm = this.formBuilder.group({
      source: [''],
      destination: [''],
      date: [''],
    });
  }

  fetchCities(): void {
    this.cityService.getCities().subscribe(
      (cities) => {
        this.cities = cities;
      },
      (error) => {
        console.log('Failed to fetch cities', error);
      }
    );
  }

  private _filterOptions(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter((option) => option.toLowerCase().includes(filterValue));
  }

  setupAutocomplete(): void {
    this.filteredSourceOptions = this.searchForm.get('source')?.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterOptions(value, this.cities))
    )!;

    this.filteredDestinationOptions = this.searchForm.get('destination')?.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterOptions(value, this.cities))
    )!;
  }

  // Handle form submission
  search(): void {
    // Get the search input values
    const departure = this.searchForm.get('source')?.value;
    const destination = this.searchForm.get('destination')?.value;
    const date = (document.getElementById('date') as HTMLInputElement).value;

    // Navigate to the /List_cov route with query parameters
    this.router.navigate(['/List_cov'], {
      queryParams: { departure, destination, date },
      queryParamsHandling: 'merge',
    });
  }

  search2(): void {
    this.router.navigate(['/List_cov2'], {});
  }
}

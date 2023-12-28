import { Component,OnInit } from '@angular/core';
import { cov } from '../../cov';
import { CovoiturageService } from '../../covoiturage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-update-cov',
  templateUrl: './update-cov.component.html',
  styleUrls: ['./update-cov.component.css']
})


export class UpdateCovComponent implements OnInit {
  prodForm: FormGroup; 
  id!: number;
  cov: cov = new cov();
  constructor(private CovoiturageService: CovoiturageService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute ,
    private router: Router , private keycloak: KeycloakService) {

      this.prodForm = this.formBuilder.group({
        ok: ['', Validators.required], 
        prix: ['', [Validators.required, Validators.min(1)]], 
      });
     }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.CovoiturageService.getCovoiturageById(this.id).subscribe((data: cov) => {
      console.log(data);
      this.cov = data;
    }, (error: any) => console.log(error));
  }

  onSubmit(){
   
    this.CovoiturageService.updateCovoiturage(this.id, this.cov).subscribe( (data: any) =>{
      this.goToProdList();
    }
    , (error: any) => console.log(error));
  }

  logout(): void {
   
    this.keycloak.clearToken();
    
 
    this.keycloak.logout('http://localhost:4200/'); 
  }
  goToProdList(){
    this.router.navigate(['list']);
  }
}


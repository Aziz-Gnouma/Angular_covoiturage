import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

import { User } from '../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      name: '',
      password: ''
    });
  }

  onLogin(loginForm: NgForm): void {
    localStorage.clear;
    if (loginForm.valid) {
          this.apiService.login(loginForm.value).subscribe(
            (res:User)=>{
              console.log(res)
              alert("Login Successful")
              loginForm.reset();
              localStorage.setItem('username', res.username);
              localStorage.setItem('email', res.email);
              localStorage.setItem('id', res.id.toString());
              const userJSON = JSON.stringify(res);
                localStorage.setItem("user", userJSON);
              console.log(localStorage);
                
                  const roles = res.role.name
                  
                  
                  
                  if (roles=='ADMIN') {
                    
                    this.router.navigate(['admin'], {
                      state: { userResponse: res }
                    });
                  } else if (roles=='DRIVER') {
                    this.router.navigate(['dash']);
                    localStorage.setItem('username', res.username);
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('email', res.email);
                    localStorage.setItem('id', res.id.toString());
                    
                  }else if (roles=='CLIENT') {
                    this.router.navigate(['client']);
                    localStorage.setItem('username', res.username);
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('email', res.email);
                    localStorage.setItem('id', res.id.toString());
                    
                  }
                },
                (error) => {
                  console.error(error);
                  alert('Une erreur s\'est produite lors de la récupération des informations utilisateur.');
                }
           )} ;
              
          }
   
      
        
    
}

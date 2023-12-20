import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashComponent } from './driver_dash/dash/dash.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ListCovComponent } from './driver_dash/list-cov/list-cov.component';
import { CreateCovComponent } from './driver_dash/create-cov/create-cov.component';
import { UpdateCovComponent } from './driver_dash/update-cov/update-cov.component';
import { ReservationsComponent } from './driver_dash/reservations/reservations.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';




const routes: Routes = [

    {path:'reservation',component:ReservationsComponent},
    {path:'dash',component:DashComponent},
    {path:'',component:AcceuilComponent},
    {path:'list',component:ListCovComponent},
    {path:'Add',component:CreateCovComponent},
    {path:'Update-cov/:id',component:UpdateCovComponent},
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

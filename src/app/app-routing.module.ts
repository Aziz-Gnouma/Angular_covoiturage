import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';



import { ClientComponent } from './client/client.component';
import { DriverComponent } from './Driver/Driver.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'client', component: ClientComponent },
  { path: 'driver', component: DriverComponent },
   { path: 'admin', component: AdminComponent }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  
 
]
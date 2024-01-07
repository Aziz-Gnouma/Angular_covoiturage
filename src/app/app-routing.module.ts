import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DashComponent } from './driver_dash/dash/dash.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ListCovComponent } from './driver_dash/list-cov/list-cov.component';
import { CreateCovComponent } from './driver_dash/create-cov/create-cov.component';
import { UpdateCovComponent } from './driver_dash/update-cov/update-cov.component';
import { ReservationsComponent } from './driver_dash/reservations/reservations.component';
import { ServicePageComponent} from './service-page/service-page.component';
import { DashadminComponent } from './admin/dashadmin/dashadmin.component';
import { ListDriverComponent } from './admin/list_driver/list-driver.component';
import { ListClientComponent } from './admin/list-client/list-client.component';
import { ListCoviComponent } from './admin/list-covi/list-covi.component';
import { AuthGuard } from './keycloak-init/AuthGuard';
import { initializeKeycloak } from './keycloak-init/keycloak-init.module';
import * as Keycloak from 'keycloak-js';
import {Client_acceuilComponent } from './client_espace/client_acceuil/client_acceuil.component';
import { List_covoiturageComponent } from './client_espace/list_covoiturage/list_covoi.component';
import { List_covoiturage2Component } from './client_espace/list_covoiturage2/list_covoi2.component';

const routes: Routes = [
    { path: 'reservation', component: ReservationsComponent, canActivate: [AuthGuard] },
    { path: 'dash', component: DashComponent, canActivate: [AuthGuard] },
    { path: '', component: AcceuilComponent },
    { path: 'list', component: ListCovComponent, canActivate: [AuthGuard] },
    { path: 'Add', component: CreateCovComponent, canActivate: [AuthGuard] },
    { path: 'Update-cov/:id', component: UpdateCovComponent, canActivate: [AuthGuard] },
    { path: 'service', component: ServicePageComponent },
    { path: 'dashadmin', component: DashadminComponent, canActivate: [AuthGuard] },
    { path: 'listdriver', component: ListDriverComponent, canActivate: [AuthGuard] },
    { path: 'listclient', component: ListClientComponent, canActivate: [AuthGuard] },
    { path: 'listcov', component: ListCoviComponent, canActivate: [AuthGuard] },
    { path: 'Client_acceuil', component: Client_acceuilComponent, canActivate: [AuthGuard] },
    { path: 'List_cov', component: List_covoiturageComponent , canActivate: [AuthGuard]},
    { path: 'List_cov2', component: List_covoiturage2Component , canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

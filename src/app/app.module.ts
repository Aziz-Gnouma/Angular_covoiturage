import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { IonicModule } from '@ionic/angular';



import { DashComponent } from './driver_dash/dash/dash.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ListCovComponent } from './driver_dash/list-cov/list-cov.component';
import { CreateCovComponent } from './driver_dash/create-cov/create-cov.component';
import { UpdateCovComponent } from './driver_dash/update-cov/update-cov.component';
import { ReservationsComponent } from './driver_dash/reservations/reservations.component';
import { Client_acceuilComponent } from './client_espace/client_acceuil/client_acceuil.component';



import { DashadminComponent } from './admin/dashadmin/dashadmin.component';
import { ListDriverComponent } from './admin/list_driver/list-driver.component';
import { ListClientComponent } from './admin/list-client/list-client.component';
import { ListCoviComponent } from './admin/list-covi/list-covi.component';
import { KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import { List_covoiturageComponent } from './client_espace/list_covoiturage/list_covoi.component';
import { NavbarComponent } from './client_espace/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    AcceuilComponent,
    ListCovComponent,
    CreateCovComponent,
    UpdateCovComponent,
    ReservationsComponent,
    Client_acceuilComponent,

    DashadminComponent,
    ListDriverComponent,
    ListClientComponent,
    ListCoviComponent,

    List_covoiturageComponent,
      NavbarComponent
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    KeycloakAngularModule,
    IonicModule,
  ],
  providers: [
    KeycloakService,

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // 
import { NgxPaginationModule } from 'ngx-pagination';

import { DashComponent } from './driver_dash/dash/dash.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ListCovComponent } from './driver_dash/list-cov/list-cov.component';
import { CreateCovComponent } from './driver_dash/create-cov/create-cov.component';
import { UpdateCovComponent } from './driver_dash/update-cov/update-cov.component';
import { ReservationsComponent } from './driver_dash/reservations/reservations.component';
@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    AcceuilComponent,
    ListCovComponent,
    CreateCovComponent,
    UpdateCovComponent,
    ReservationsComponent,
    
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    ReactiveFormsModule ,

    AppRoutingModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

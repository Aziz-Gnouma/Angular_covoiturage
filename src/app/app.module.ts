import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // 
import { NgxPaginationModule } from 'ngx-pagination';

import { DashComponent } from './driver_dash/dash/dash.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ListCovComponent } from './driver_dash/list-cov/list-cov.component';
import { CreateCovComponent } from './driver_dash/create-cov/create-cov.component';
import { UpdateCovComponent } from './driver_dash/update-cov/update-cov.component';
import { ReservationsComponent } from './driver_dash/reservations/reservations.component';
import { TokenInterceptor } from './Token/token.interceptor';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashadminComponent } from './admin/dashadmin/dashadmin.component';
import { ListDriverComponent } from './admin/list_driver/list-driver.component';
import { ListClientComponent } from './admin/list-client/list-client.component';
import { ListCoviComponent } from './admin/list-covi/list-covi.component';

@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    AcceuilComponent,
    ListCovComponent,
    CreateCovComponent,
    UpdateCovComponent,
    ReservationsComponent,
    LoginComponent,
    SignupComponent,
    DashadminComponent,
    ListDriverComponent,
    ListClientComponent,
    ListCoviComponent,
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    ReactiveFormsModule ,

    AppRoutingModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  
    DatePipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }

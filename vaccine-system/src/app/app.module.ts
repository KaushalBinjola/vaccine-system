import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProducerComponent } from './producer/producer.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CrudService } from './crud.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProducerVaccineComponent } from './producer-vaccine/producer-vaccine.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CityTransferComponent } from './city-transfer/city-transfer.component';
import { ConsumerComponent } from './consumer/consumer.component';
import { ConsumerVaccineComponent } from './consumer-vaccine/consumer-vaccine.component';
import { CartComponent } from './cart/cart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { LoginComponent } from './login/login.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AddUpdateProducerVaccineComponent } from './add-update-producer-vaccine/add-update-producer-vaccine.component';
import { AuthGuard } from './auth-guard.service';
import { ProducerAuth } from './admin-auth.service';
import { ConsumerAuth } from './notadmin-auth.service';


@NgModule({
  declarations: [
    AppComponent,
    ProducerComponent,
    HomeComponent,
    ProducerVaccineComponent,
    NavbarComponent,
    CityTransferComponent,
    ConsumerComponent,
    ConsumerVaccineComponent,
    CartComponent,
    LoginComponent,
    AddUpdateProducerVaccineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path:'', component:HomeComponent},
      {path:'signupProducer', component:ProducerComponent},
      {path:'signupConsumer',component:ConsumerComponent},
      {path:'vaccine/add', component:AddUpdateProducerVaccineComponent, canActivate:[AuthGuard,ProducerAuth]},  
      {path:'vaccine/update/:id', component:AddUpdateProducerVaccineComponent, canActivate:[AuthGuard,ProducerAuth]},
      {path:'vaccine/:name', component:ProducerVaccineComponent, canActivate:[AuthGuard,ProducerAuth]},
      {path:'consumer/:email',component:ConsumerVaccineComponent, canActivate:[AuthGuard,ConsumerAuth]},
      {path: 'cities', component:CityTransferComponent, canActivate:[AuthGuard,ProducerAuth]},
      {path: 'cart/:email', component:CartComponent, canActivate:[AuthGuard,ConsumerAuth]},
      {path: 'login', component:LoginComponent},
    ]),
    ReactiveFormsModule,
    HttpClientModule,
    HighchartsChartModule,
  ],
  providers: [CrudService,JwtHelperService,AuthGuard,ProducerAuth,ConsumerAuth],
  bootstrap: [AppComponent]
})

export class AppModule { }

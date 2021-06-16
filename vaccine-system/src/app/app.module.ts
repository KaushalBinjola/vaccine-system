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
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path:'', component:HomeComponent},
      {path:'signupProducer', component:ProducerComponent},
      {path:'signupConsumer',component:ConsumerComponent},
      {path:'vaccine/:name', component:ProducerVaccineComponent},
      {path:'consumer/:email',component:ConsumerVaccineComponent},
      {path: 'cities', component:CityTransferComponent},
      {path: 'cart/:email', component:CartComponent},
    ]),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [CrudService],
  bootstrap: [AppComponent]
})

export class AppModule { }

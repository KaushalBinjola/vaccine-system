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

@NgModule({
  declarations: [
    AppComponent,
    ProducerComponent,
    HomeComponent,
    ProducerVaccineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path:'', component:HomeComponent},
      {path:'signup', component:ProducerComponent},
      {path:'vaccine/:name', component:ProducerVaccineComponent}
    ]),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }

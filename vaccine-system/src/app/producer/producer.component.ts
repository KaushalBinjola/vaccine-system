import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CrudService } from '../crud.service';
import { SignupValidators } from '../signup.validators';


@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css']
})

export class ProducerComponent implements OnInit {
  producers: any
  readonly baseUrl = "http://localhost:3000/producer/"

  form = new FormGroup({
    producer_name: new FormControl("", [
      Validators.required,
      SignupValidators.cannotContainSpace
    ]),
    producer_email: new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ]),
    producer_id: new FormControl("", [
      Validators.required,
      SignupValidators.cannotContainSpace
    ])
  })

  constructor(private producerService: CrudService) { }

  ngOnInit() {
    this.producerService.get(this.baseUrl)
      .subscribe(response => {
        this.producers = response
      })


  }

  postProducer() {
    this.producerService.post(this.baseUrl, this.form.value)
      .subscribe((res) => {
        this.form.reset()
        console.log(` Added ${res} `)
      });
  }

  resetFields() {
    this.form.reset()
  }

  get producer_name() {
    return this.form.get('producer_name')
  }

  get producer_email() {
    return this.form.get('producer_email')
  }

  get password() {
    return this.form.get('password')
  }

  get producer_id() {
    return this.form.get('producer_id')
  }

  dismiss(ip: any) {
    ip.touched = false
  }
}

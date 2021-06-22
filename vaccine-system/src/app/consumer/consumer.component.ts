import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../crud.service';
import { SignupValidators } from '../signup.validators';
import { VaccineValidators } from '../vaccine.validation';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.css']
})
export class ConsumerComponent implements OnInit {

  readonly baseUrl: string = "http://localhost:3000/consumer" 

  form = new FormGroup({
    consumer_name: new FormControl("", [
      Validators.required,
      SignupValidators.cannotContainSpace
    ]),
    consumer_email: new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ]),
    city_name: new FormControl("", [
      Validators.required,
      Validators.pattern(/^([^0-9]*)$/)
    ]),
    age: new FormControl("", [
      Validators.required,
      VaccineValidators.cannotBeNegative
    ]),
    phone_number: new FormControl("", [
      Validators.required,
      Validators.minLength(10),
      VaccineValidators.cannotBeNegative
    ])
  })


  constructor(private consumerService: CrudService) { }

  ngOnInit(): void {

    this.form.get('consumer_email')?.setErrors({
      emailTaken: true
    }
    )

  }

  postConsumer() {
    this.form.value['city_name'] = this.form.value['city_name'].toUpperCase()
    this.consumerService.post(this.baseUrl, this.form.value)
      .subscribe(res => {
        this.form.reset()
      })
  }

  resetFields() {
    this.form.reset()
  }

  checkEmail() {
    let consumerEmail = this.form.value['consumer_email']
    this.consumerService.get(`${this.baseUrl}/email/${consumerEmail}`)
      .subscribe(res => {
        let consumer: any = res
        if (consumer.length != 0) {
          this.form.get('consumer_email')?.setErrors({
            emailTaken: true
          }
          )
        }
      })
  }

  get consumer_name() {
    return this.form.get('consumer_name')
  }

  get consumer_email() {
    return this.form.get('consumer_email')
  }

  get password() {
    return this.form.get('password')
  }

  get city_name() {
    return this.form.get('city_name')
  }

  get age() {
    return this.form.get('age')
  }

  get phone_number() {
    return this.form.get('phone_number')
  }

  dismiss(v: any) {
    v.touched = false
  }
}

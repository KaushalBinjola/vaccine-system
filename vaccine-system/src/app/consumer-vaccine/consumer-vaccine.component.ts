import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../crud.service';
import { VaccineValidators } from '../vaccine.validation';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-consumer-vaccine',
  templateUrl: './consumer-vaccine.component.html',
  styleUrls: ['./consumer-vaccine.component.css']
})
export class ConsumerVaccineComponent implements OnInit {
  consumer: any
  name: string = ""
  city: string = ""
  cities: any
  consumerEmail: string = ""
  decodedToken: any


  form = new FormGroup({
    _id: new FormControl("", [
      Validators.required
    ]),
    original_stock: new FormControl(),
    consumer_email: new FormControl(),
    vaccine_name: new FormControl(),
    stock: new FormControl("", [
      Validators.required,
      VaccineValidators.cannotBeNegative
    ]),
  })

  readonly consumerUrl = "http://localhost:3000/consumer"
  readonly cityUrl = "http://localhost:3000/city"
  readonly cartUrl = "http://localhost:3000/cart"

  constructor(private consumerService: CrudService) {

  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.decodedToken = this.consumerService.token()
    }
    this.consumerEmail = this.decodedToken.email
    this.name = this.decodedToken.name
    this.getCityName()
  }

  getCityName() {
    this.consumerService.get(`${this.consumerUrl}/email/${this.consumerEmail}`)
      .subscribe(res => {
        this.consumer = res
        this.city = this.consumer[0]['city_name']
        this.getCities()
      })
  }

  getCities() {
    this.consumerService.get(`${this.cityUrl}/${this.city}`)
      .subscribe(res =>
        this.cities = res)
  }

  setForm(vac: any) {
    this.form.setValue({
      _id: vac._id,
      original_stock: vac.stock,
      consumer_email: this.consumerEmail,
      vaccine_name: vac.vaccine_name,
      stock: 0
    })
  }


  buyVaccine() {
    if (this.stock?.value > this.original_stock?.value) {
      this.form.setErrors({
        insufficientStock: true
      })
    }
    else {
      let vaccine = {
        consumer_email: this.consumerEmail,
        vaccine_name: this.vaccine_name?.value,
        stock: this.stock?.value,
        return: 0,
        return_reason: ""
      }

      let leftStock = this.original_stock?.value - this.stock?.value

      this.consumerService.post(this.cartUrl, vaccine)
        .subscribe(res => {
          console.log(res)
        })

      let city = {
        city_name: this.city,
        vaccine_name: this.vaccine_name?.value,
        stock: leftStock
      }

      this.consumerService.put(`${this.cityUrl}/${this._id?.value}`, city)
        .subscribe(res => {
          console.log(res)
          this.ngOnInit()
          this.form.reset()
        })
    }
  }


  get _id() {
    return this.form.get('_id')
  }

  get original_stock() {
    return this.form.get('original_stock')
  }

  get vaccine_name() {
    return this.form.get('vaccine_name')
  }

  get stock() {
    return this.form.get('stock')
  }

  resetFields() {
    this.form.reset()
  }

  dismiss(v: any) {
    v.touched = false
  }

  formOk() {
    this.form.setErrors({
      insufficientStock: false
    })
  }

}

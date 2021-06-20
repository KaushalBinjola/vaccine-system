import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../crud.service';
import { VaccineValidators } from '../vaccine.validation';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  name: string = ""
  consumerEmail: string = ""
  cartItems: any
  decodedToken: any

  readonly consumerUrl = "http://localhost:3000/consumer"
  readonly cartUrl = "http://localhost:3000/cart"

  form = new FormGroup({
    _id: new FormControl("", [
      Validators.required
    ]),
    consumer_email: new FormControl(),
    vaccine_name: new FormControl(),
    stock: new FormControl(),
    original_return: new FormControl(),
    return: new FormControl("", [
      Validators.required,
      VaccineValidators.cannotBeNegative
    ]),
    original_returnReason: new FormControl(),
    return_reason: new FormControl("", [
      Validators.required,
    ])
  })

  constructor(private cartService: CrudService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.decodedToken = this.cartService.token()
    }
    this.name = this.decodedToken.name
    this.consumerEmail = this.decodedToken.email
    this.getCart()
  }

  getCart() {
    this.cartService.get(`${this.cartUrl}/${this.consumerEmail}`)
      .subscribe(res =>
        this.cartItems = res)
  }

  setForm(v: any) {
    this.form.setValue({
      _id: v._id,
      consumer_email: v.consumer_email,
      vaccine_name: v.vaccine_name,
      stock: v.stock,
      original_return: v.return,
      return: 0,
      original_returnReason: v.return_reason,
      return_reason: ""
    })
  }

  returnVaccine() {
    if (this.return?.value > this.stock?.value) {
      this.form.setErrors({
        insufficientStock: true
      })
    }
    else {
      let vaccine = {
        consumer_email: this.consumer_email?.value,
        vaccine_name: this.vaccine_name?.value,
        stock: this.stock?.value - this.return?.value,
        return: this.return?.value + this.original_return?.value,
        return_reason: `${this.original_returnReason?.value}, ${this.return_reason?.value}`
      }
      this.cartService.put(`${this.cartUrl}/${this._id?.value}`, vaccine)
        .subscribe(res => {
          this.ngOnInit()
          this.form.reset()
        })
    }
  }

  deleteVaccine(vac: any) {
    let id = vac._id
    this.cartService.delete(`${this.cartUrl}/${id}`)
      .subscribe(res =>
        this.ngOnInit())
  }


  get _id() {
    return this.form.get('_id')
  }

  get consumer_email() {
    return this.form.get('consumer_email')
  }

  get vaccine_name() {
    return this.form.get('vaccine_name')
  }

  get stock() {
    return this.form.get('stock')
  }

  get original_return() {
    return this.form.get('original_return')
  }

  get return() {
    return this.form.get('return')
  }

  get original_returnReason() {
    return this.form.get('original_returnReason')
  }

  get return_reason() {
    return this.form.get('return_reason')
  }

  resetFields() {
    this.form.reset()
  }

  formOk() {
    this.form.setErrors({
      insufficientStock: false
    })
  }

  dismiss(v: any) {
    v.touched = false
  }
}

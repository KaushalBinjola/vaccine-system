import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  readonly consumerUrl: string = 'http://localhost:3000/consumer'
  readonly producerUrl: string = 'http://localhost:3000/producer'
  responseValue: any

  form = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl("", [
      Validators.required,
    ]),
    isProducer: new FormControl()
  })

  constructor(private loginService: CrudService, private router: Router) { }

  ngOnInit(): void {
    this.form.setErrors({
      invalidLogin: false
    })
  }

  login() {
    if (this.isProducer?.value == null) {
      this.loginService.get(`${this.consumerUrl}/login/${this.email?.value}/${this.password?.value}`)
        .subscribe(res => {
          this.responseValue = res
          if (this.responseValue.length == 0) {
            this.form.setErrors({
              invalidLogin: true
            })
          }
          else {
            let name = this.responseValue[0]['consumer_name']
            this.loginService.get(`${this.consumerUrl}/token/${this.email?.value}/${name}`)
              .subscribe(res => {
                let token = res
                localStorage.removeItem('token')
                localStorage.setItem('token', JSON.stringify(token))
                this.router.navigate(['/'])
              })
          }
        })
    }

    else {
      this.loginService.get(`${this.producerUrl}/login/${this.email?.value}/${this.password?.value}`)
        .subscribe(res => {
          this.responseValue = res
          if (this.responseValue.length == 0) {
            this.form.setErrors({
              invalidLogin: true
            })
          }
          else {
            let name = this.responseValue[0]['producer_name']
            this.loginService.get(`${this.producerUrl}/token/${this.email?.value}/${name}`)
              .subscribe(res => {
                let token = res
                localStorage.setItem('token', JSON.stringify(token))
                this.router.navigate(['/'])
              })
          }
        })
    }
  }

  get email() {
    return this.form.get('email')
  }

  get password() {
    return this.form.get('password')
  }

  get isProducer() {
    return this.form.get('isProducer')
  }

  resetFields() {
    this.form.reset()
  }

  dismiss(v: any) {
    v.touched = false
  }

  formOk() {
    this.form.setErrors({
      invalidLogin: false
    })
  }

}

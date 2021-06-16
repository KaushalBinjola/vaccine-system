import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CrudService } from '../crud.service';
import { SignupValidators } from '../signup.validators';


@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css']
})

export class ProducerComponent implements OnInit {
  
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

  constructor(private producerService: CrudService, private router:Router) { }

  ngOnInit() {
    this.form.get('producer_name')?.setErrors({
      nameTaken: false
    }
    )
  }

  postProducer() {
    this.producerService.post(this.baseUrl, this.form.value)
      .subscribe((res) => {
        this.router.navigate(['/'])
        this.form.reset()
        console.log(` Added ${res} `)
      });

    
  }

  checkName() {
    let producerName = this.form.value['producer_name']
    this.producerService.get(`${this.baseUrl}/${producerName}`)
      .subscribe(res => {
        let producer: any = res
        if (producer.length != 0) {
          this.form.get('producer_name')?.setErrors({
            nameTaken: true
          }
          )
        }
      })
  }

  checkEmail() {
    let producerEmail = this.form.value['producer_email']
    this.producerService.get(`${this.baseUrl}/email/${producerEmail}`)
      .subscribe(res => {
        let producer: any = res
        if (producer.length != 0) {
          this.form.get('producer_email')?.setErrors({
            emailTaken: true
          }
          )
        }
      })
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

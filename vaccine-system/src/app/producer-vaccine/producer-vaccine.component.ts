import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../crud.service';
import { ProducerVaccine } from '../shared/producer-vaccine.model';
import { VaccineValidators } from '../vaccine.validation';

@Component({
  selector: 'app-producer-vaccine',
  templateUrl: './producer-vaccine.component.html',
  styleUrls: ['./producer-vaccine.component.css']
})

export class ProducerVaccineComponent implements OnInit {
  name?: string
  vaccines?: any
  readonly baseUrl = "http://localhost:3000/vaccine"

  form = new FormGroup({
    producer_name: new FormControl(),
    vaccine_name: new FormControl("", [
      Validators.required
    ]),
    stock: new FormControl("", [
      Validators.required,
      VaccineValidators.cannotBeNegative
    ]),
    expiry_date: new FormControl("", [
      Validators.required,
      VaccineValidators.isDate
    ])
  })

  formUpdate = new FormGroup({
    _id: new FormControl("", [
      Validators.required
    ]),
    producer_name: new FormControl(),
    vaccine_name: new FormControl("", [
      Validators.required
    ]),
    stock: new FormControl("", [
      Validators.required,
      VaccineValidators.cannotBeNegative
    ]),
    expiry_date: new FormControl("", [
      Validators.required,
      VaccineValidators.isDate
    ])
  })


  constructor(private route: ActivatedRoute, private vaccineService: CrudService) {
  }



  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.name = params.get('name') as string
      })

    this.getVaccine()
  }

  getVaccine() {
    let newUrl = this.baseUrl + '/' + this.name
    this.vaccineService.get(newUrl)
      .subscribe(response => {
        this.vaccines = response
      })
  }

  postVaccine() {
    this.form.value['producer_name'] = this.name
    this.form.value['vaccine_name'] = this.form.value['vaccine_name'].toUpperCase()

    let vaccineNames: string[] = [];

    for (let i of this.vaccines) {
      vaccineNames.push(i['vaccine_name'])
    }

    if (vaccineNames.includes(this.form.value['vaccine_name'])) {
      this.form.setErrors({
        vaccinePresent: true
      })
      this.form.reset()
    }

    else {
      let newUrl = this.baseUrl + '/' + this.name
      this.vaccineService.post(newUrl, this.form.value)
        .subscribe(res => {
          this.ngOnInit()
          this.form.reset()
          console.log(`Added vaccine ${res}`)
        })
    }

  }

  updateVaccine() {
    let newUrl = this.baseUrl + '/' + this.formUpdate.value['_id']
    console.log(newUrl)
    let postValue = this.formUpdate.value
    // delete postValue['_id'] //removing id from form Updates
    console.log(postValue)
    this.vaccineService.put(newUrl, postValue)
      .subscribe(res => {
        this.ngOnInit()
        this.formUpdate.reset()
        console.log(`Update vaccine ${res}`)
      })
  }


  deleteVaccine(v: any) {
    let newUrl = this.baseUrl + '/' + v['_id']
    this.vaccineService.delete(newUrl)
      .subscribe(res => {
        this.ngOnInit()
        this.formUpdate.reset()
        console.log(`Deleted vaccine ${res}`)
      })
  }

  editVaccine(v: any) {
    this.formUpdate.setValue({
      _id: v['_id'],
      producer_name: v['producer_name'],
      vaccine_name: v['vaccine_name'],
      stock: v['stock'],
      expiry_date: v['expiry_date'].slice(0, 10)
    })
  }

  resetFields() {
    this.form.reset()
  }

  resetFields2() {
    this.formUpdate.reset()
  }





  //form get values
  get producer_name() {
    return this.form.get('producer_name')
  }

  get vaccine_name() {
    return this.form.get('vaccine_name')
  }

  get stock() {
    return this.form.get('stock')
  }

  get expiry_date() {
    return this.form.get('expiry_date')
  }


  //formUpdate get values
  get producer_name2() {
    return this.formUpdate.get('producer_name')
  }

  get vaccine_name2() {
    return this.formUpdate.get('vaccine_name')
  }

  get stock2() {
    return this.formUpdate.get('stock')
  }

  get expiry_date2() {
    return this.formUpdate.get('expiry_date')
  }


  dismiss(f: any) {
    f.touched = false
  }

  formOk() {
    this.form.setErrors({
      vaccinePresent: false
    })
  }
}

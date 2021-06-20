import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../crud.service';
import { VaccineValidators } from '../vaccine.validation';


@Component({
  selector: 'app-add-update-producer-vaccine',
  templateUrl: './add-update-producer-vaccine.component.html',
  styleUrls: ['./add-update-producer-vaccine.component.css']
})
export class AddUpdateProducerVaccineComponent implements OnInit {
  name: string = ""
  decodedToken: any
  isAdd: boolean = false
  vaccines: any
  id: string = ""

  readonly baseUrl = "http://localhost:3000/vaccine"


  form = new FormGroup({
    _id: new FormControl(),
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

  constructor(private addUpdateProdVaccineService: CrudService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.decodedToken = this.addUpdateProdVaccineService.token()
    }
    this.name = this.decodedToken.name
    let url = this.router.url
    let urlArr = url.split('/')
    console.log(url)
    console.log(urlArr)
    if (urlArr.includes('add')) {
      this.isAdd = true
      console.log(this.isAdd)
      this.getVaccines()
    }
    else {
      let index = urlArr.indexOf('update')
      this.id = urlArr[index + 1]
      console.log(this.id)
      this.setForm()
    }

  }

  getVaccines() {
    let newUrl = this.baseUrl + '/' + this.name
    this.addUpdateProdVaccineService.get(newUrl)
      .subscribe(response => {
        this.vaccines = response
      })
  }

  setForm() {
    this.addUpdateProdVaccineService.get(`${this.baseUrl}/stock/${this.id}`)
      .subscribe(res => {
        let vaccine: any = res
        this.form.setValue({
          _id: this.id,
          producer_name: this.name,
          vaccine_name: vaccine[0]['vaccine_name'],
          stock: 0,
          expiry_date: vaccine[0]['expiry_date'].slice(0, 10)
        })
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
      this.addUpdateProdVaccineService.post(newUrl, this.form.value)
        .subscribe(res => {
          this.ngOnInit()
          this.form.reset()
          console.log(`Added vaccine ${res}`)
        })
      this.router.navigate(['/vaccine', this.name])
    }
  }

  updateVaccine() {
    let newUrl = this.baseUrl + '/' + this.form.value['_id']
    console.log(newUrl)
    let postValue = this.form.value
    console.log(postValue)
    this.addUpdateProdVaccineService.put(newUrl, postValue)
      .subscribe(res => {
        this.ngOnInit()
        this.form.reset()
        console.log(`Update vaccine ${res}`)
      })
    this.router.navigate(['/vaccine', this.name])

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

  resetFields() {
    this.form.reset()
  }

  dismiss(v: any) {
    v.touched = false
  }

  formOk() {
    this.form.setErrors({
      vaccinePresent: false
    })
  }
}

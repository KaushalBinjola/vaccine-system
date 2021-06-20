import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../crud.service';
import { VaccineValidators } from '../vaccine.validation';
import * as Highcharts from 'highcharts'
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-city-transfer',
  templateUrl: './city-transfer.component.html',
  styleUrls: ['./city-transfer.component.css']
})


export class CityTransferComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  cities: any
  name: string = ""
  producerVaccines: any
  chartVaccineNames: string[] = []
  chartStock: number[] = []
  decodedToken: any

  producerUrl = "http://localhost:3000/vaccine"
  cityUrl = "http://localhost:3000/city"

  form = new FormGroup({
    _id: new FormControl("", [
      Validators.required
    ]),
    producer_name: new FormControl(),
    vaccine_name: new FormControl(),
    stock: new FormControl("", [
      Validators.required,
      VaccineValidators.cannotBeNegative
    ]),
    expiry_date: new FormControl(),
    city_name: new FormControl("", [
      Validators.required,
      Validators.pattern(/^([^0-9]*)$/)
    ]),
  })

  chartOptions: any

  constructor(private cityService: CrudService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.decodedToken = this.cityService.token()
    }
    this.name = this.decodedToken.name

    this.getCities()
    this.getProducer()
  }

  getCities() {
    this.cityService.get(this.cityUrl)
      .subscribe(res => {
        this.cities = res
      })
  }

  getProducer() {
    this.cityService.get(this.producerUrl + '/' + this.name)
      .subscribe(res => {
        this.producerVaccines = res
        for (let i of this.producerVaccines) {
          this.chartVaccineNames.push(i['vaccine_name'])
          this.chartStock.push(i['stock'])
        }
        console.log(this.chartVaccineNames)
        console.log(this.chartStock)
        this.makeChart()
      })
  }

  setValues(v: any) {
    this.form.setValue({
      _id: v['_id'],
      producer_name: v['producer_name'],
      vaccine_name: v['vaccine_name'],
      stock: 0,
      expiry_date: v['expiry_date'],
      city_name: ""
    })
  }

  addToCity() {
    this.form.value['city_name'] = this.form.value['city_name'].toUpperCase()
    console.log(this.form.value)

    //check if stock for this are greater than stock available
    var producerGetByIdUrl: string = `${this.producerUrl}/stock/${this.form.value['_id']}`

    this.cityService.get(producerGetByIdUrl)
      .subscribe(res => {
        var selectedVaccine: any = res
        var stockAvailable = selectedVaccine[0]['stock']
        if (this.form.value['stock'] > stockAvailable) {
          return this.form.setErrors({
            insufficientStock: true
          })
        }


        let cityName: string = this.form.value['city_name']
        let vaccineName: string = this.form.value['vaccine_name']

        let cityVaccineValue = {
          city_name: cityName,
          vaccine_name: vaccineName,
          stock: this.form.value['stock']
        }

        this.cityService.get(`${this.cityUrl}/${cityName}/${vaccineName}`)
          .subscribe(res => {
            let response: any = res
            console.log(response)
            if (response.length != 0) {
              cityVaccineValue['stock'] += response[0]['stock']
              this.cityService.put(`${this.cityUrl}/${response[0]['_id']}`, cityVaccineValue)
                .subscribe(res => {
                  console.log(`Update city and vaccine ${res}`)
                })
            }
            else {
              this.cityService.post(this.cityUrl, cityVaccineValue)
                .subscribe(res => {
                  console.log(`Made city and vaccine ${res}`)
                })
            }


            let formValue = this.form.value

            delete formValue['city_name']

            console.log(stockAvailable)
            formValue['stock'] = stockAvailable - this.form.value['stock']
            console.log(formValue)
            this.cityService.put(`${this.producerUrl}/${this.form.value['_id']}`, formValue)
              .subscribe(res => {
                this.ngOnInit()
                this.form.reset()
              })
          })
      })
  }


  get city_name() {
    return this.form.get('city_name')
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

  makeChart() {
    this.chartOptions = {
      title: {
        text: 'Producer Information'
      },

      yAxis: {
        title: {
          text: 'Stocks Present'
        }
      },

      xAxis: {
        title: {
          text: 'Vaccine Name'
        },
        categories: this.chartVaccineNames,
        accessibility: {
          rangeDescription: "Vaccine Names",
        }
      },

      series: [
        {
          type: "line",
          name: "vaccines",
          data: this.chartStock
        }
      ]
    };
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Producer } from './shared/producer.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  selectedProducer?: CrudService
  producers?: Producer[];


  constructor(private http: HttpClient) { }

  post(baseUrl: string, val: any) {
    return this.http.post(baseUrl, val)
  }

  get(baseUrl: string) {
    return this.http.get(baseUrl)
  }

  put(baseUrl: string, val: any) {
    return this.http.put(baseUrl, val)
  }

  delete(baseUrl: string) {
    return this.http.delete(baseUrl)
  }

  token() {
    const helper = new JwtHelperService()
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token')
      let token2 = token?.slice(1, token?.length - 1)
      let decodedToken = helper.decodeToken(token2)
      return decodedToken
    }
    else {
      return false
    }
  }

  isLoggedIn() {
    let helper = new JwtHelperService()
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token')
      let token2 = token?.slice(1, token?.length - 1)
      return true
    }
    else{
      return false
    }
  }

  isAdmin() {
    let helper = new JwtHelperService()
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token')
      let token2 = token?.slice(1, token?.length - 1)
      let decodedToken = helper.decodeToken(token2)
      return decodedToken.admin
    }
    else{
      return false
    }
  }
}

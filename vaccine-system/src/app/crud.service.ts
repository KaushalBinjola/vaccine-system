import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Producer } from './shared/producer.model';

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

  delete(baseUrl:string){
    return this.http.delete(baseUrl)
  }
}

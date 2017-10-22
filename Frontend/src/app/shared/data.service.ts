import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  constructor(private http:HttpClient) { }

  sendMail(contactDetails){
    return this.http.post('http://localhost:5000/contact_us',contactDetails)
  }

  getCity(){
    return this.http.get('http://localhost:5000/store/city')
  }

  getServices(cityName){
    return this.http.get('http://localhost:5000/store/'+cityName);
  }
}

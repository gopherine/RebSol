import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  constructor(private http:HttpClient) { }

  sendMail(contactDetails){
    return this.http.post('http://localhost:5000/contact_us',contactDetails)
  }

  getCountry(){
    return this.http.get('http://localhost:5000/country')
  }

  getCity(countryName){
    return this.http.get('http://localhost:5000/reb/'+countryName)
  }

  getServices(countryName,cityName){
    return this.http.get('http://localhost:5000/reb/'+countryName+'/'+cityName);
  }

  getLeads(countryName,cityName,serviceName){
    return this.http.get('http://localhost:5000/reb/'+countryName+'/'+cityName+'/'+serviceName)
  }
}

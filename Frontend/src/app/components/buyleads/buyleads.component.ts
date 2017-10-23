import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '../../shared/data.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-buyleads',
  templateUrl: './buyleads.component.html',
  styleUrls: ['./buyleads.component.scss']
})
export class BuyleadsComponent implements OnInit {
// Storing the name of selected values
    cityName: string;
    countryName: string;
    serviceName: string;
// Storing the array to display contents on screen
    cities:Object;
    services:Object;
    countries:Object;
    leads:Object;
    whatTime = Observable.interval(1000).map(x => new Date()).share();
    

    // [
    //   {CityName : "Delhi"},
    //   {CityName : "Bangalore"},
    //   {CityName : "Pune"}
    // ];
  constructor(private data:DataService) { }

  ngOnInit() {
    this.data.getCountry().subscribe(
      (response)=>{
        this.countries=response
        console.log(response)},
      (error)=> console.log(error)
     )
  }

  getCities(countryName){
    this.data.getCity(countryName).subscribe(
      (response)=> this.cities=response,
      (error)=> console.log(error)
    );
  }

  getServices(cityName){
    this.data.getServices(this.countryName,cityName).subscribe(
      (response)=>this.services=response,
      (error)=> console.log(error)
     )
  }

  onSearch(){
    console.log(this.countryName, this.cityName, this.serviceName)
    this.data.getLeads(this.countryName,this.cityName,this.serviceName).subscribe(
      (response)=>{this.leads=response['Leads']
    console.log(this.leads)},
      (error)=> console.log(error)
     )
  }
}

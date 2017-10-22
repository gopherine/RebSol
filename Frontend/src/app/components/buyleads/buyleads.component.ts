import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-buyleads',
  templateUrl: './buyleads.component.html',
  styleUrls: ['./buyleads.component.scss']
})
export class BuyleadsComponent implements OnInit {

  cityName: string;
  
    foods = [
      {value: 'steak-0', viewValue: 'Steak'},
      {value: 'pizza-1', viewValue: 'Pizza'},
      {value: 'tacos-2', viewValue: 'Tacos'}
    ];

    cities:Object;
    services;
    

    // [
    //   {CityName : "Delhi"},
    //   {CityName : "Bangalore"},
    //   {CityName : "Pune"}
    // ];
  constructor(private data:DataService) { }

  ngOnInit() {
    this.data.getCity().subscribe(
      (response)=> this.cities=response,
      (error)=> console.log(error)
    );
  }

  getServices(cityName){
    this.data.getServices(cityName).subscribe(
      (response)=>this.services=response
     )
  }
}

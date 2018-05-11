declare let L : any;

import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import {WeatherService} from "../weather-service";
import { _ } from 'underscore';


@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.less']
})
export class CitiesComponent implements OnInit {

  leafletMap: any;
  constructor(private dataService : WeatherService) { }
  origCitiesList : City[];
  cities:City[];
  isMale : boolean = true;
  dataLoaded : boolean = false;
  map : any;
  gender : string = "male";
  numberofResults : number = 10;
  ngOnInit() {
    this.dataService.getCities().subscribe((cities)=>{
      var result : string = cities.text();
      var resultLength : number = result.length;
      result = result.substring(14, resultLength-1);
      var myJSON : any = JSON.parse(result);
      this.origCitiesList = myJSON.list;
      this.origCitiesList = _.sortBy(this.origCitiesList, function(item) { 
            return item.main.temp + "_" + item.main.humidity;
        });
       this.updateList();  
     });    

     this.dataService.updateNumberValue.subscribe(
        value => { this.numberofResults = value
        this.updateList();
      }
    );

    this.dataService.updateGenderValue.subscribe(
        value => { this.isMale = value
          this.updateList();
        }
    );
  
  }

  public onChange(evt){
    this.updateList();
  }
  
  public onGenderChange(evt){
    this.isMale = this.gender == "male";
    this.updateList();
  }

  private updateList(){

    if(this.map != null){
      for(let city of this.cities){
        city.mapLayer.remove();  
      }
    }

    var optimumTemp : number = this.isMale?21:22;
    var start : number =0;
    for(var i=0; i<this.origCitiesList.length;i++){
      if(this.origCitiesList[i].main.temp == optimumTemp && this.origCitiesList[i].main.humidity >= 50){
        start = i;
        break;
      }  
    }

    this.cities = [];
    for(var i=0;i<this.numberofResults;i++){
      this.cities.push(this.origCitiesList[start+i]);
    }
   
    this.dataLoaded = true;
    this.loadMap();

  }

  loadMap(){
    if(this.map == undefined){
      this.map = L.map('mapid', {
        center: [51.505, -0.09],
        zoom: 1
      });
    }
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    for(let city of this.cities){
      var layer : any = L.circleMarker([city.coord.Lat, city.coord.Lon], {color: "#3388ff"}).addTo(this.map); 
      city.mapLayer = layer;
    }

    return 1;
  }

}

interface City{
  name : string;
  main : {
    humidity : number;
    temp : number;
  }
  coord:{
    Lat : number;
    Lon : number;
  }

  mapLayer : any;
  mapColor : string;
}
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {WeatherService} from "./weather-service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  gender : string = "male";
  numberofresults : number = 10;

  constructor(private dataService: WeatherService){

  }

  public onChange(evt){
    this.dataService.setNumberOfValues(this.numberofresults);
  }
  
  public onGenderChange(evt){
    this.dataService.setGender(this.gender == "male");
  }
}

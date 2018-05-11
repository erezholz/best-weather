import { Injectable } from '@angular/core';
import {Http} from  '@angular/http';
import { Subject } from 'rxjs';

@Injectable()
export class WeatherService {

  public updateNumberValue : Subject<number> = new Subject<number>();
  public updateGenderValue : Subject<boolean> = new Subject<boolean>();

  constructor(public http : Http) { }

  public setNumberOfValues(value){
    this.updateNumberValue.next(value);
  }

  public setGender(value){
    this.updateGenderValue.next(value);
  }
  getCities(){
    return this.http.get('http://api.openweathermap.org/data/2.5/box/city?bbox=-110,30,40,40,10&APPID=da2b8edb04940ed0faaa6799bad8cebc&callback=JSON_CALLBACK') ;
  }

}

import { Injectable } from '@angular/core';
import {Http} from  '@angular/http';
import { Subject, Observer } from 'rxjs';
import 'rxjs/add/operator/map';

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
    return this.http.get('http://api.openweathermap.org/data/2.5/box/city?bbox=-110,30,40,40,10&APPID=da2b8edb04940ed0faaa6799bad8cebc&callback=JSON_CALLBACK').map(val =>{
      console.log(val);
      var result : string = val.text();
      var resultLength : number = result.length;
      result = result.substring(14, resultLength-1);
      return JSON.parse(result).list;
    }) ;
  }

}

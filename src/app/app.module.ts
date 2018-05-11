import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import {WeatherService} from './weather-service';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { CitiesComponent } from './cities/cities.component';


@NgModule({
  declarations: [
    AppComponent,
    CitiesComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }

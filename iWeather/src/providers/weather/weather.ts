import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {
  private apiKey = 'cd6acb8ca4e069e2ab53ba53a751bb4c';
  private apiKey2 = '68fb60c25a06874c4bfc0f3e3d21d1ed';
  private url:string;
  private url2: string;

  constructor(public http: Http) {
    this.url = 'http://api.openweathermap.org/data/2.5/weather?appid=' + this.apiKey +'&lang=fr&units=metric&q=';
    this.url2 = 'http://api.openweathermap.org/data/2.5/forecast?appid=' + this.apiKey2 + '&lang=fr&units=metric&q=';

  }

  getWeather(city) {
      return this.http.get(this.url+city).map(res => res.json());
  }

  getWeekWeather(city) {
    return this.http.get(this.url2+city).map(res => res.json());
  }

  getCardWeather(lat, lon){
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?appid='+this.apiKey+'&lang=fr&units=metric&lat='+lat+'&lon='+lon)
      .map(res => res.json());
  }

  getCardWeekWeather(lat, lon){
    return this.http.get('http://api.openweathermap.org/data/2.5/forecast?appid='+this.apiKey+'&lang=fr&units=metric&lat='+lat+'&lon='+lon)
      .map(res => res.json());
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {WeatherProvider} from "../../providers/weather/weather";
import {Geolocation} from "@ionic-native/geolocation";

/**
 * Generated class for the WeekPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-week',
  templateUrl: 'week.html',
})
export class WeekPage {
  nlat       : number;
  nlon       : number;
  weather    : any;
  weekWeather: any;
  loc : {
    city : string;
  };
  city:any;

  constructor(
    public  navCtrl         : NavController,
    private weatherProvider : WeatherProvider,
    private storage         : Storage,
    private geolocation     : Geolocation,
   ) {
  }

  ionViewWillEnter() {


    this.storage.get('loc').then((val) => {
      if(val != null) {
        this.loc = JSON.parse(val);

        this.weatherProvider.getWeather(this.loc.city)
          .subscribe(weather => {
            this.weather = weather;
          });

        this.weatherProvider.getWeekWeather(this.loc.city)
          .subscribe(weekWeather => {
            this.weekWeather = weekWeather;
          });
      } else {

        this.geolocation.getCurrentPosition().then( pos => {
          this.nlat = pos.coords.latitude;
          this.nlon = pos.coords.longitude;

          this.weatherProvider.getCardWeather(this.nlat, this.nlon)
            .subscribe(cardWeather => {
              this.weather = cardWeather;
            });

          this.weatherProvider.getCardWeekWeather(this.nlat, this.nlon)
            .subscribe(cardWeather => {
              this.weekWeather = cardWeather;
            });
        }).catch(err=>console.log(err));
      }
    });
  }
}

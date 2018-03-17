import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';
import {WeekPage} from "../week/week";
import {Geolocation} from "@ionic-native/geolocation";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private nlat : number;
  private nlon : number;
  public weather : any;
  private loc : {
    city : string;
  };

  constructor(
    public navCtrl: NavController,
    private weatherProvider:WeatherProvider,
    private storage: Storage,
    private geolocation : Geolocation) {
  }

  ionViewWillEnter() {
    this.storage.get('loc').then((val) => {
      if(val != null) {
        this.loc = JSON.parse(val);
        this.weatherProvider.getWeather(this.loc.city)
          .subscribe(weather => {
            this.weather = weather;
            console.log(weather)
          });
      } else {
        this.geolocation.getCurrentPosition().then( pos => {
          this.nlat = pos.coords.latitude;
          this.nlon = pos.coords.longitude;
          this.weatherProvider.getCardWeather(this.nlat, this.nlon)
            .subscribe(cardWeather => {
              this.weather = cardWeather;
            })
        }).catch(err=>console.log(err));
      }
    });
  }

  goToP(){
    this.navCtrl.setRoot(WeekPage);
  }

}

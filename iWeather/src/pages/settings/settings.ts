import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';


/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  city:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage){
      this.storage.get('loc').then((val) => {
        if(val != null) {
          let loc = JSON.parse(val);
          this.city = loc.city;
        } else {
          this.city = 'paris';
        }
      });
  }

  ionViewDidLoad() {
  }

  saveForm() {
    let loc = {
      city: this.city
    };
    this.storage.set('loc',JSON.stringify(loc));
    this.navCtrl.push(HomePage);
  }

}

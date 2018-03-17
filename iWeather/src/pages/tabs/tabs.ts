import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';
import { WeekPage } from "../week/week";



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab4Root = SettingsPage;
  tab5Root = WeekPage;


  constructor() {

  }
}

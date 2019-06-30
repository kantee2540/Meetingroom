import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { IndexPage } from '../pages/index';
import { ChooseTimePage } from '../pages/choose-time/choose-time';
import { HowToPage } from '../pages/how-to/how-to';
import { HistoryPage } from '../pages/history/history';
import { AdminCheckPage } from '../pages/admin-check/admin-check';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = IndexPage;

  first_name:string;
  last_name:string;

  pages: Array<{title: string, component: any, icon:string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'หน้่าเเรก', component: IndexPage, icon: 'home' },
      { title: 'ประวัติการใช้งาน', component: HistoryPage, icon: 'timer' },
      { title: 'วิธีใช้', component: HowToPage, icon: 'help'},
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.statusBar.styleDefault();
      
      this.statusBar.styleLightContent(); //statusbar สีขาว (ios)
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  goHome(){
    this.nav.popToRoot();
  }

  toFirstPage(){
    this.nav.popToRoot();
  }
  
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ChooseTimePage } from '../choose-time/choose-time';

/**
 * Generated class for the A604Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-a604',
  templateUrl: 'a604.html',
})
export class A604Page {

  first_name : string;
  last_name : string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.first_name = this.navParams.get('first_name');
    this.last_name = this.navParams.get('last_name');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad A604Page');
  }

  goToChooseTime(){
    this.navCtrl.push(ChooseTimePage, {
      roomNo : 'A604',
      first_name : this.first_name,
      last_name : this.last_name
    })

  }

  goBack(){
    this.navCtrl.pop();
  }

}

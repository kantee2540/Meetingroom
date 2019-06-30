import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ResultPage } from '../result/result';

/**
 * Generated class for the DescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-description',
  templateUrl: 'description.html',
})
export class DescriptionPage {

  dateTime: string;
  desc: string;
  roomNo: string;
  public first_name: string;
  public last_name: string;
  countTime: number;
  checkboxModel: Array<{text : string}> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dateTime = this.navParams.get('dateTime');
    this.roomNo = this.navParams.get('roomNo');
    this.first_name = this.navParams.get('first_name');
    this.last_name = this.navParams.get('last_name');
    this.checkboxModel = this.navParams.get('Time');
    this.countTime = this.navParams.get('countTime');
  }

  goToResult(){
    this.navCtrl.push(ResultPage, {
      dateTime : this.dateTime,
      desc : this.desc,
      roomNo : this.roomNo,
      first_name : this.first_name,
      last_name : this.last_name,
      Time : this.checkboxModel,
      countTime : this.countTime
    })
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad DescriptionPage');
  }

}

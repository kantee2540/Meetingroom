import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { ChooseTimePage } from '../choose-time/choose-time';
import { A604Page } from '../a604/a604';
import { A605Page } from '../a605/a605';
import { a } from '@angular/core/src/render3';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public first_name: string;
  public last_name: string;

  roomStatus: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private af: AngularFireDatabase,
    private menu:MenuController
  ) {
    this.first_name = this.navParams.get('first_name');
    this.last_name = this.navParams.get('last_name');

    this.af.database.ref('/RoomSetting').on('value', (snapshot) =>
      this.roomStatus = snapshot.val()
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.menu.swipeEnable(true);
  }

  reserveA604() {
    this.navCtrl.push(A604Page, {
      first_name: this.first_name,
      last_name: this.last_name
    })
  }

  reserveA605() {
    this.navCtrl.push(A605Page, {
      first_name: this.first_name,
      last_name: this.last_name
    })
  }

  //A604 CHECK
  checkA604Room() {
    try {
      if (this.roomStatus.A604 == 1) {
        return "เปิดใช้งานตามปกติ";
      }
      else {
        return "ปิดปรับปรุง";
      }
    }
    catch{
      return "กำลังโหลด...";
    }
  }
  checkButtonA604() {
    try {
      if (this.roomStatus.A604 == 1) {
        return false;
      }
      else {
        return true;
      }
    }
    catch{
      return true;
    }
  }
  iconCheckA604() {
    try {
      if (this.roomStatus.A604 == 1) {
        return false;
      }
      else {
        return true;
      }
    }
    catch{
      return true;
    }
  }

  //A605 CHECK
  checkA605Room() {
    try {
      if (this.roomStatus.A605 == 1) {
        return "เปิดใช้งานตามปกติ";
      }
      else {
        return "ปิดปรับปรุง";
      }
    }
    catch{
      return "กำลังโหลด...";
    }
  }
  checkButtonA605() {
    try {
      if (this.roomStatus.A605 == 1) {
        return false;
      }
      else {
        return true;
      }
    } catch{ }
  }
  iconCheckA605() {
    try {
      if (this.roomStatus.A605 == 1) {
        return false;
      }
      else {
        return true;
      }
    }
    catch{
      return true;
    }
  }
}

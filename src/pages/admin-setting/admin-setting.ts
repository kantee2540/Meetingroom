import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
/**
 * Generated class for the AdminSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-setting',
  templateUrl: 'admin-setting.html',
})
export class AdminSettingPage {

  A604BookingSetting: string;
  A605BookingSetting: string;

  statusData: any;
  A604;
  A605;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private af: AngularFireDatabase,
    private toastCtrl: ToastController) {
    this.statusData = this.navParams.get('statusData');
    this.A604 = this.statusData.A604;
    this.A605 = this.statusData.A605;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminSettingPage');

  }

  goToSettingAccept(statusValue: any) {
    /*
    let key = this.af.list('/RoomSetting').push({
      A604: this.A604BookingSetting,
      A605: this.A605BookingSetting
    }).key*/

    this.af.database.ref('/RoomSetting').set({
      A604: statusValue.A604,
      A605: statusValue.A605
    });
    console.log("Status A604 :" + statusValue.A604);
    console.log("Status A605 :" + statusValue.A605);

    let clearAlert = this.toastCtrl.create({
      message: 'ตั้งค่าการอนุญาติจองห้องเรียบร้อย',
      duration: 3000
    });
    clearAlert.present();
  }

  check() {
    return true;
  }
}

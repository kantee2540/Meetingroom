import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  oldUser: string;
  oldPass: string;
  originalPass: string;
  newPass: string;
  confirmPass: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private af: AngularFireDatabase) {
    this.oldPass = this.navParams.get('oldPass');
    this.oldUser = this.navParams.get('oldUser');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  changePassword() {
    if (this.oldPass == this.originalPass && this.newPass == this.confirmPass) {
      this.af.database.ref('/Useradmin').set({
        username: this.oldUser,
        password: this.newPass
      });
      alert('รหัสผ่านถูกเปลี่ยนแล้ว');
      this.navCtrl.pop();
    }
    else{
      if(this.oldPass != this.originalPass){
        alert('รหัสผ่านเดิมไม่ถูกต้อง');
      }
      else{
        alert('รหัสผ่านใหม่ และรหัสผ่านยืนยันไม่ตรงกัน');
      }
    }
  }

  cancel() {
    this.navCtrl.pop();
  }
}

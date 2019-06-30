import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-change-username',
  templateUrl: 'change-username.html',
})
export class ChangeUsernamePage {

  pass: string;
  newUseradmin: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private af:AngularFireDatabase) {
    this.pass = this.navParams.get('pass');
  }

  changeUsername(){
    this.af.database.ref('/Useradmin').set({
      username: this.newUseradmin,
      password: this.pass
    }),(error) => console.log(error)
    alert('เปลี่ยนชื่อผู้ใช้สำเร็จ');
    this.navCtrl.pop();
  }

  cancel(){
    this.navCtrl.pop();
  }

  
}

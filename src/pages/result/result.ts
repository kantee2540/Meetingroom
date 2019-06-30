import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { isRightSide } from 'ionic-angular/umd/util/util';

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {
  itemRef: AngularFireList<any>;
  itemRef2: AngularFireList<any>;
  items: Observable<any[]>;
  items2: Observable<any[]>;
  dateTime: string;
  desc: string;
  roomNo: string;
  first_name: string;
  last_name: string;
  countTime: number;
  checkboxModel: Array<{ text: string }>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private af: AngularFireDatabase, ) {
    this.dateTime = this.navParams.get('dateTime');
    this.desc = this.navParams.get('desc');
    this.roomNo = this.navParams.get('roomNo');
    this.first_name = this.navParams.get('first_name');
    this.last_name = this.navParams.get('last_name');
    this.checkboxModel = this.navParams.get('Time');
    this.countTime = this.navParams.get('countTime');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
  }


  clickBack() {
    //Goback
    this.navCtrl.pop();
  }

  save() {
    /*
    let key = this.af.list('/Booking/'+this.first_name+' '+this.last_name+'/Information').push({
      FirstName : this.first_name,
      LastName : this.last_name,
      Room : this.roomNo,
      Date : this.dateTime,
      Time : this.checkboxModel,
      Description : this.desc
    }).key;*/

    let key = this.af.list('/Booking').push({
      FirstName: this.first_name,
      LastName: this.last_name,
      Room: this.roomNo,
      Date: this.dateTime,
      Time: this.checkboxModel,
      Description: this.desc
    }).key
    
    for (let i = 0; i < this.checkboxModel.length; i++) {
      
      let keyTime = this.af.list('/TimeBooking').push({
        FirstName: this.first_name,
        Room: this.roomNo,
        Date: this.dateTime,
        Time: this.checkboxModel[i]
      }).key

      
    }

    //alert("ข้อมูลบันทึกสำเร็จแล้ว!\nระบบจะกลับไปยังหน้าแรกสุด");

    let alert = this.alertCtrl.create({
      title: 'จองห้องสำเร็จ!',
      //message: 'ระบบได้ทำการบันทึกข้อมูลการจองเรียบร้อยแล้ว ท่านสามารถจองห้องประชุมเพิ่มได้อีก',
      message: `
        <div class = 'successful-alert'>
          <h1><i class="fas fa-check-circle"></i></h1>
          ระบบได้ทำการบันทึกข้อมูลการจองเรียบร้อยแล้ว ท่านสามารถจองห้องเพิ่มเติมได้อีก
        </div>
      `,
      buttons: [{
        text: 'กลับไปหน้าแรก',
        role: 'goBack',
        handler: data => {
          this.navCtrl.popToRoot();
        }
      }],
      enableBackdropDismiss: false
    })
    alert.present();
    
  }
  alertC() {


  }

  clickConfirm() {
    alert("I am an alert box!");
  }

}

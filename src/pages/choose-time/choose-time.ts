import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, PopoverController, Label } from 'ionic-angular';
import { DescriptionPage } from '../description/description';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ChooseTimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose-time',
  templateUrl: 'choose-time.html',
})
export class ChooseTimePage {
  roomNo: string;
  dateTime: string;
  first_name: string;
  last_name: string;
  selOptions = [];
  Time0: Array<{ whatTime: string }> = [];
  countTime: number;
  checkBoxIsChecked: boolean;
  menuIsToogle: boolean = false;

  label: Array<any>;

  itemRefBusy: AngularFireList<any>;
  itemsBusy: Observable<any[]>;

  checkboxModel: Array<{ value: boolean, text: string }> = [
    { value: false, text: '08:00 - 09:00' },
    { value: false, text: '09:00 - 10:00' },
    { value: false, text: '10:00 - 11:00' },
    { value: false, text: '11:00 - 12:00' },
    { value: false, text: '12:00 - 13:00' },
    { value: false, text: '13:00 - 14:00' },
    { value: false, text: '14:00 - 15:00' },
    { value: false, text: '15:00 - 16:00' },
    { value: false, text: '16:00 - 17:00' }
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public actionsheetCtrl: ActionSheetController,
    public popoverCtrl: PopoverController,
    public af: AngularFireDatabase) {
    this.roomNo = this.navParams.get('roomNo');
    this.first_name = this.navParams.get('first_name');
    this.last_name = this.navParams.get('last_name');
    this.checkboxChange();

    this.af.database.ref('/TimeBooking').on('value', (snapshot) => {
      this.label = snapshot.val()
    })
    
  }


  checkboxChange() {
    this.countTime = 0;
    let selOptions = [],
      checkboxes = this.checkboxModel;
    for (let i = 0; i < checkboxes.length; ++i) {
      if (checkboxes[i].value) {
        selOptions.push(' ' + checkboxes[i].text);
        this.countTime = this.countTime + 1;
      }
    }
    this.selOptions = selOptions;
  };

  //เช็คให้เปิดปุ่ม 'ถัดไป'
  checkEnabled(form: any) {
    this.checkBoxIsChecked = false;
    for (let i = 0; i < this.checkboxModel.length; i++) {
      if (this.checkboxModel[i].value) {
        this.checkBoxIsChecked = true;
      }
    }
    if (form["dateTime"] != undefined && this.checkBoxIsChecked) {
      return false;
    }
    else {
      return true;
    }

  }
  
  menuToogle(){
    if(this.dateTime != undefined){
      this.menuIsToogle = true;
    }
  }

  //เช็ค ว่าง ไม่ว่าง
  checkBusy(time: any) {
    let busy = false;
    
    for (let key in this.label) {
      if (time == this.label[key].Time && this.roomNo == this.label[key].Room && this.dateTime == this.label[key].Date) {
        busy = true;
      }
    }
    if (busy){
      return "ไม่ว่าง";
    }
    else{
      return "ว่าง";
    }


  }

  checkBusyDisabled(time: any) {
    let busy = false;
    for (let key in this.label) {
      if (time == this.label[key].Time && this.roomNo == this.label[key].Room && this.dateTime == this.label[key].Date) {
        busy = true;
      }
    }

    if(busy){
      return true;
    }
    else{
      return false;
    }
  }

  checkBusyMarkX(time: any){
    let busy = false;
    for (let key in this.label) {
      if (time == this.label[key].Time && this.roomNo == this.label[key].Room && this.dateTime == this.label[key].Date) {
        busy = true;
      }
    }

    if (busy) {
      return false;
    }
    else {
      return true;
    }
  }

  save() {
    this.navCtrl.push(DescriptionPage, {
      dateTime: this.dateTime,
      roomNo: this.roomNo,
      first_name: this.first_name,
      last_name: this.last_name,
      Time: this.selOptions,
      countTime: this.countTime
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseTimePage');
  }



}

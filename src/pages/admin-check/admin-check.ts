import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item, LoadingController, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { HistoryDetailPage } from '../history-detail/history-detail';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';
import { AdminSettingPage } from '../admin-setting/admin-setting';
import { ChangeUsernamePage } from '../change-username/change-username';
import { ChangePasswordPage } from '../change-password/change-password';
import { AdminManagePage } from '../admin-manage/admin-manage';
import { HowToPage } from '../how-to/how-to';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
/**
 * Generated class for the AdminCheckPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-check',
  templateUrl: 'admin-check.html',
})
export class AdminCheckPage {
  itemRef: AngularFireList<any>;
  itemRefTime: AngularFireList<any>;
  items: Observable<any[]>;
  itemsTime: Observable<any[]>;
  itemsCount: Array<any>;
  today = Date();
  statusData: any;
  forDelete: any;

  adminUser: any;
  login: any;
  loginWrong: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public af: AngularFireDatabase,
    private actionSteetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {

    this.itemRef = this.af.list('/Booking', ref =>
      ref.orderByChild('Room')
    );
    this.af.database.ref('/Useradmin').on('value', (snapshot) =>
      this.adminUser = snapshot.val()
    )

    this.itemRefTime = this.af.list('/TimeBooking');
    this.af.database.ref('/TimeBooking').on('value', (snapshot) =>
      this.forDelete = snapshot.val()
    )

    this.af.database.ref('/RoomSetting').on('value', (snapshot) =>
      this.statusData = snapshot.val()
    )

    this.checkLogin();

  }

  checkLogin() {
    this.login = this.alertCtrl.create({
      title: 'เข้าสู่ระบบ',
      message: `โปรดลงชื่อเข้าใช้ ด้วยชื่อผู้งาน และรหัสผ่านของผู้ดูแลระบบ`,
      inputs: [
        {
          name: 'Username',
          type: 'text',
          placeholder: 'ชื่อผู้ใช้งาน (ค่าเริ่มต้น : admin)'
        },
        {
          name: 'Password',
          type: 'password',
          placeholder: 'รหัสผ่าน'
        }],
      buttons: [{
        text: 'ยกเลิก',
        handler: cancel => {
          this.navCtrl.pop();
        }
      }, {
        text: 'เข้าสู่ระบบ',
        role: 'login',
        handler: (login) => {
          try {
            if (login.Username == this.adminUser.username && login.Password == this.adminUser.password) {
              this.loginWrong = false;
              return true;
            }
            else {
              this.loginWrong = true;
              alert('ชื่อผู้ใช้หรือรหัสผ่านผิด โปรดลองอีกครั้ง');
              return false;
            }
          }
          catch{
            alert('โปรดลองอีกครั้ง');
          }
        }
      }],
      enableBackdropDismiss: false
    })
    this.login.present();
  }

  goToHistoryDetail(item: any) {

    this.navCtrl.push(HistoryDetailPage, {
      setitem: item
    });
  }
  goToAdminManage() {
    this.navCtrl.push(AdminManagePage, {

    });
  }

  goToSetting() {

    this.navCtrl.push(AdminSettingPage, {
      statusData: this.statusData
    });
  }
  goToChangeUsername() {
    this.navCtrl.push(ChangeUsernamePage, {
      pass: this.adminUser.password
    });
  }

  goToChangePassword() {
    this.navCtrl.push(ChangePasswordPage, {
      oldUser: this.adminUser.username,
      oldPass: this.adminUser.password
    });
  }


  clearHistory() {
    let clearHisory = this.actionSteetCtrl.create({
      title: 'ต้องการจะล้างข้อมูลการจองทั้งหมดหรือไม่ เมื่อล้างไปแล้วจะไม่สามารถดึงข้อมูลกลับคืนมาได้',
      buttons: [
        {
          text: 'ล้างการจองทั้งหมด',
          role: 'destructive',
          handler: () => {
            this.itemRef.remove();
            this.itemRefTime.remove();
            let clearAlert = this.toastCtrl.create({
              message: 'ล้างข้อมูลเรียบร้อยแล้ว',
              duration: 3000
            });
            clearAlert.present();
          }
        },
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    clearHisory.present();
  }
  goToHelp() {
    this.navCtrl.push(HowToPage);
  }

  signOut() {
    this.navCtrl.pop();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminCheckPage');

  }

}

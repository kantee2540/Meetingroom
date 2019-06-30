import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController } from "ionic-angular";
import { HistoryDetailPage } from '../history-detail/history-detail';

import { AngularFireDatabase, AngularFireList, snapshotChanges } from "angularfire2/database";
import { Observable } from "rxjs/observable";
import "rxjs/add/operator/map";

/**
 * Generated class for the AdminManagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-admin-manage",
  templateUrl: "admin-manage.html"
})
export class AdminManagePage {
  itemRef: AngularFireList<any>;
  itemRefTime: AngularFireList<any>;
  items: Observable<any[]>;
  itemsTime: Observable<any[]>;
  itemsCount: Array<any>;
  today = Date();
  statusData: any;
  forDelete: any;
  showNoneDiv: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public af: AngularFireDatabase,
    public loadCtrl: LoadingController,
    public actionSteetCtrl: ActionSheetController
  ) {
    let load = this.loadCtrl.create({
      content: "กำลังโหลด...",
      spinner: "circles"
    });
    load.present();
    this.itemRef = this.af.list("/Booking", ref => ref.orderByChild("Room"));

    this.itemRefTime = this.af.list("/TimeBooking");
    this.af.database
      .ref("/TimeBooking")
      .on("value", snapshot => (this.forDelete = snapshot.val()));

    this.af.database.ref("/Booking").on("value", snapshot => {
      this.itemsCount = snapshot.val();
      this.countRow();
    });

    this.af.database
      .ref("/RoomSetting")
      .on("value", snapshot => (this.statusData = snapshot.val()));

    this.items = this.itemRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    load.dismiss();
  }

  countRow() {
    let i = 0;
    for (let key in this.itemsCount) {
      i++;
    }
    console.log('Count Meeting is reserved = ' + i);

    if (i == 0) {
      this.showNoneDiv = true;
    }
    else {
      this.showNoneDiv = false;
    }
  }

  goToHistoryDetail(item: any) {

    this.navCtrl.push(HistoryDetailPage, {
      setitem: item
    });
  }

  delete(item: any) {

    let delOpton = this.actionSteetCtrl.create({
      title: 'ต้องการลบการจองนี้หรือไม่?',
      buttons: [
        {
          text: 'ลบการจอง',
          role: 'destructive',
          handler: () => {
            //ลบรายละเอียดผู้ใช้
            this.itemRef.remove(item.key);

            //ลบเวลาเพื่อให้กลับมาขึ้นว่างอีกครั้ง
            for (let i in this.forDelete) {
              if (item.FirstName == this.forDelete[i].FirstName && item.Date == this.forDelete[i].Date && item.Room == this.forDelete[i].Room) {
                try {
                  this.itemRefTime.remove(i);
                  console.log(this.forDelete[i].FirstName + " has removed!");
                }
                catch{
                  console.log('It s work????');
                }
              }
            }
          }
        },
        {
          text: 'ไม่ลบการจอง',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    delOpton.present();
  }

  
}

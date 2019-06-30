import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Alert } from 'ionic-angular';
import { HistoryDetailPage } from '../history-detail/history-detail';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  itemRef: AngularFireList<any>;
  items: Observable<any[]>;
  itemsCount: Array<any>;

  showNoneDiv: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public af: AngularFireDatabase,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {

    let loading = this.loadCtrl.create({
      content: 'กำลังโหลด...',
      spinner: 'circles'
    });
    loading.present();

    this.itemRef = this.af.list('/Booking', ref =>
      ref.orderByChild('Room')
    );

    this.af.database.ref('/Booking').on('value', (snapshot) => {
      this.itemsCount = snapshot.val()
      this.countRow()
    })

    this.items = this.itemRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });



    loading.dismiss();
  }

  //count ROW
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
    console.log(item);
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');

  }

}

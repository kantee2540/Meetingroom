import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

/**
 * Generated class for the HistoryDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history-detail',
  templateUrl: 'history-detail.html',
})
export class HistoryDetailPage {

  itemRef: AngularFireList<any>;
  items: Observable<any[]>;
  getItem: any;

  room: string;
  firstName: string;
  lastName: string;
  date: string;
  description: string;
  time: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private af: AngularFireDatabase) 
    {
    this.getItem = this.navParams.get('setitem');

    this.room = this.getItem["Room"];
    this.firstName = this.getItem["FirstName"];
    this.lastName = this.getItem["LastName"];
    this.date = this.getItem["Date"];
    this.description = this.getItem["Description"];
    this.time = this.getItem["Time"];

  }

  goBack(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryDetailPage');
    console.log(this.time);
  }

}

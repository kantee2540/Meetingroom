import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController
} from "ionic-angular";

import { AdminCheckPage } from "../admin-check/admin-check";
import { HomePage } from "../home/home";
import { HistoryPage } from "../history/history";

/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-index",
  templateUrl: "index.html"
})
export class IndexPage {
  first_name: string;
  last_name: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menu: MenuController,
  ) {}

  onSubmit() {
    this.navCtrl.push(HomePage, {
      first_name: this.first_name,
      last_name: this.last_name
    });
  }
  goHistory() {
    this.navCtrl.push(HistoryPage);
  }

  goAdmin() {
    this.navCtrl.push(AdminCheckPage);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad IndexPage");
    this.menu.swipeEnable(false);
  }
}

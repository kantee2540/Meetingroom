import { AdminSettingPageModule } from './../pages/admin-setting/admin-setting.module';
import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { MyApp } from "./app.component";
import { IndexPageModule } from "../pages/index/index.module";
import { HomePageModule } from "../pages/home/home.module";
import { A604PageModule } from "../pages/a604/a604.module";
import { A605PageModule } from "../pages/a605/a605.module";
import { ListPage } from "../pages/list/list";
import { ChooseTimePageModule } from "../pages/choose-time/choose-time.module";
import { DescriptionPageModule } from "../pages/description/description.module";
import { ResultPageModule } from "../pages/result/result.module";
import { HowToPageModule } from "../pages/how-to/how-to.module";
import { HistoryPageModule } from '../pages/history/history.module';
import { HistoryDetailPageModule } from '../pages/history-detail/history-detail.module';
import { AdminCheckPageModule } from '../pages/admin-check/admin-check.module';
import {} from '../pages/admin-setting/admin-setting.module';
import { ChangeUsernamePageModule } from '../pages/change-username/change-username.module';
import { ChangePasswordPageModule } from '../pages/change-password/change-password.module';
import { AdminManagePageModule } from '../pages/admin-manage/admin-manage.module';

import { AngularFireModule } from "angularfire2";
import {
  AngularFireDatabaseModule,
  AngularFireDatabase
} from "angularfire2/database";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

export const config = {
  //1
  apiKey: "AIzaSyDlHqxCFegLmw7WWbJm6JPYBtiQ_z0vmKw",
  authDomain: "it-meetingroom.firebaseapp.com",
  databaseURL: "https://it-meetingroom.firebaseio.com",
  projectId: "it-meetingroom",
  storageBucket: "it-meetingroom.appspot.com",
  messagingSenderId: "981617437958"
};

@NgModule({
  declarations: [MyApp, ListPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config), //2
    AngularFireDatabaseModule,
    ChooseTimePageModule,
    IndexPageModule,
    HomePageModule,
    A604PageModule,
    A605PageModule,
    IonicModule,
    DescriptionPageModule,
    ResultPageModule,
    HowToPageModule,
    HistoryPageModule,
    HistoryDetailPageModule,
    AdminCheckPageModule,
    AdminSettingPageModule,
    ChangeUsernamePageModule,
    ChangePasswordPageModule,
    AdminManagePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, ListPage],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}

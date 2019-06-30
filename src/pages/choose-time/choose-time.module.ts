import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseTimePage } from './choose-time';

@NgModule({
  declarations: [
    ChooseTimePage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseTimePage),
  ],
})
export class ChooseTimePageModule {}

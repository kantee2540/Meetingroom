import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminCheckPage } from './admin-check';

@NgModule({
  declarations: [
    AdminCheckPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminCheckPage),
  ],
})
export class AdminCheckPageModule {}

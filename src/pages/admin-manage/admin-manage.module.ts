import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminManagePage } from './admin-manage';

@NgModule({
  declarations: [
    AdminManagePage,
  ],
  imports: [
    IonicPageModule.forChild(AdminManagePage),
  ],
})
export class AdminManagePageModule {}

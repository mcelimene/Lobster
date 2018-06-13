import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DemandesPage } from './demandes';

@NgModule({
  declarations: [
    DemandesPage,
  ],
  imports: [
    IonicPageModule.forChild(DemandesPage),
  ],
})
export class DemandesPageModule {}

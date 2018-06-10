import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservarClasePage } from './reservar-clase';

@NgModule({
  declarations: [
    ReservarClasePage,
  ],
  imports: [
    IonicPageModule.forChild(ReservarClasePage),
  ],
})
export class ReservarClasePageModule {}

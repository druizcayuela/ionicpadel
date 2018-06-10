import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisClasesPage } from './mis-clases';

@NgModule({
  declarations: [
    MisClasesPage,
  ],
  imports: [
    IonicPageModule.forChild(MisClasesPage),
  ],
})
export class MisClasesPageModule {}

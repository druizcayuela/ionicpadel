import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalDetalleProfesorPage } from './modal-detalle-profesor';

@NgModule({
  declarations: [
    ModalDetalleProfesorPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalDetalleProfesorPage),
  ],
})
export class ModalDetalleProfesorPageModule {}

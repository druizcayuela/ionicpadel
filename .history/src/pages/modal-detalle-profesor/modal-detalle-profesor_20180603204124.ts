import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { IProfesor } from '../../interfaces/IProfesor';
import { SeleccionarProfesorProvider } from '../../../.history/src/providers/seleccionar-profesor/seleccionar-profesor_20180603203640';


@IonicPage()
@Component({
  selector: 'page-modal-detalle-profesor',
  templateUrl: 'modal-detalle-profesor.html',
})
export class ModalDetalleProfesorPage {

  profesor: IProfesor;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private viewCtrl: ViewController, private selecProf: SeleccionarProfesorProvider) {

      this.profesor = this.selecProf.profesorSeleccionado;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { IProfesor } from '../../interfaces/IProfesor';
import { SeleccionarProfesorProvider } from '../../providers/seleccionar-profesor/seleccionar-profesor';
import { MandarEmailProvider } from '../../providers/mandar-email/mandar-email';


@IonicPage()
@Component({
  selector: 'page-modal-detalle-profesor',
  templateUrl: 'modal-detalle-profesor.html',
})
export class ModalDetalleProfesorPage {

  profesor: IProfesor;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mandarEmail: MandarEmailProvider,
              private viewCtrl: ViewController, private selecProf: SeleccionarProfesorProvider) {

      this.profesor = this.selecProf.profesorSeleccionado;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  contactar(){
    this.mandarEmail.mandarEmail(this.profesor.nombre, this.profesor.email);
  }

}

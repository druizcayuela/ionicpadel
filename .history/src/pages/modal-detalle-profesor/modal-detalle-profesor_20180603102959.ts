import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { IProfesor } from '../../interfaces/IProfesor';


@IonicPage()
@Component({
  selector: 'page-modal-detalle-profesor',
  templateUrl: 'modal-detalle-profesor.html',
})
export class ModalDetalleProfesorPage {

  profesor: IProfesor;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {

      this.profesor = this.navParams.get("profesor");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}

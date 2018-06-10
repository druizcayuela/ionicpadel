import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IProfesor } from '../../../.history/src/interfaces/IProfesor_20180603124551';


@IonicPage()
@Component({
  selector: 'page-confirmar-clase',
  templateUrl: 'confirmar-clase.html',
})
export class ConfirmarClasePage {

  profesor: IProfesor;
  hora: string;
  fecha: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.profesor = this.navParams.get("profesor");
    this.hora = this.navParams.get("hora");
    this.fecha = this.navParams.get("fecha");
  }

  

}

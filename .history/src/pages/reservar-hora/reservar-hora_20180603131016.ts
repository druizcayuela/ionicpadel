import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IProfesor } from '../../interfaces/IProfesor';


@IonicPage()
@Component({
  selector: 'page-reservar-hora',
  templateUrl: 'reservar-hora.html',
})
export class ReservarHoraPage {

  profesor: IProfesor;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.profesor = this.navParams.get("profesor");
    console.log(this.profesor);
  }

}

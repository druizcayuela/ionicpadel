import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IProfesor } from '../../interfaces/IProfesor';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-reservar-hora',
  templateUrl: 'reservar-hora.html',
})
export class ReservarHoraPage {

  profesor: IProfesor;
  horarios: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, afDB: AngularFireDatabase) {

    this.profesor = this.navParams.get("profesor");
    this.horarios = afDB.list('horario', 
                        ref => ref.orderByChild('idProfesor').equalTo(this.profesor.id)).valueChanges();

    console.log(this.horarios);
  }

  seleccionarHora(fecha: string, hora: string){
    console.log(fecha, hora);
  }

}

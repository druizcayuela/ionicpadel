import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { IProfesor } from '../../interfaces/IProfesor';
import { ModalDetalleProfesorPage } from '../modal-detalle-profesor/modal-detalle-profesor';
import { ReservarHoraPage } from '../reservar-hora/reservar-hora';
import { SeleccionarProfesorProvider } from '../../providers/seleccionar-profesor/seleccionar-profesor';

@IonicPage()
@Component({
  selector: 'page-reservar-clase',
  templateUrl: 'reservar-clase.html',
})
export class ReservarClasePage {

  profesores: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private selecProf: SeleccionarProfesorProvider,
              private modalCtrl: ModalController, afDB: AngularFireDatabase) {

    this.profesores = afDB.list('profesor').valueChanges();
  }

  seleccionarProfesor(profesor: any){
    this.selecProf.cargarProfesorSeleccionado(profesor);
    this.navCtrl.push(ReservarHoraPage);
  }

  verDetalleProfesor(profesor: any, e: any){
    e.stopPropagation();
    this.selecProf.cargarProfesorSeleccionado(profesor);
    let modal = this.modalCtrl.create(ModalDetalleProfesorPage);
    modal.present();
  }

  
}

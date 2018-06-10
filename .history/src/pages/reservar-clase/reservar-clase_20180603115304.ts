import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { IProfesor } from '../../interfaces/IProfesor';
import { ModalDetalleProfesorPage } from '../modal-detalle-profesor/modal-detalle-profesor';

@IonicPage()
@Component({
  selector: 'page-reservar-clase',
  templateUrl: 'reservar-clase.html',
})
export class ReservarClasePage {

  profesores: Observable<any[]>;
  profesorSeleccionado: IProfesor;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private modalCtrl: ModalController, afDB: AngularFireDatabase) {

    this.profesores = afDB.list('profesor').valueChanges();
  }

  seleccionarProfesor(profesor: any){
    this.setProfesorSeleccionado(profesor);
  }

  verDetalleProfesor(profesor: any, e: any){
    e.stopPropagation();
    this.setProfesorSeleccionado(profesor);
    let modal = this.modalCtrl.create(ModalDetalleProfesorPage, {profesor: this.profesorSeleccionado});
    modal.present();
  }

  setProfesorSeleccionado(profesor: any){
    this.profesorSeleccionado = {
      nombre: profesor.nombre,
      apellidos: profesor.apellidos,
      email: profesor.email,
      img: profesor.img,
      telefono: profesor.telefono
    }
  }
}

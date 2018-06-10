import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { IProfesor } from '../../../.history/src/interfaces/IProfesor_20180603124551';
import { AngularFireDatabase } from 'angularfire2/database';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';
import { IClaseReservada } from '../../../.history/src/interfaces/IClaseReservada_20180603190712';


@IonicPage()
@Component({
  selector: 'page-confirmar-clase',
  templateUrl: 'confirmar-clase.html',
})
export class ConfirmarClasePage {

  profesor: IProfesor;
  hora: string;
  fecha: string;
  horaConFormato: string
  loading: any;

  claseReservada: IClaseReservada;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController,
              private afDB: AngularFireDatabase, private usuario: UsuarioProvider) {
    this.profesor = this.navParams.get("profesor");
    this.hora = this.navParams.get("hora");
    this.fecha = this.navParams.get("fecha");
    this.horaConFormato = this.navParams.get("horaConFormato");

    this.loading = this.loadingCtrl.create({
      content: "Por favor, espere...",
    });
  }

  confirmarClase(){
    this.loading.present();

    let idFecha =  this.fecha.replace(/\//g,"");
   

    this.claseReservada = {
      nombreProfesor: this.profesor.nombre,
      apellidosProfesor: this.profesor.apellidos,
      fecha: this.fecha,
      hora: this.horaConFormato,
      lugar: this.profesor.lugar,
      fechaId: idFecha,
      horaId: this.hora,
      hecho: false
    }

    idFecha += this.profesor.id;

    this.afDB.object('/horario/' + idFecha + '/submenu/' + this.hora).update({ idAlumno: this.usuario.usuario.uid})
          .then(()=>{
              this.loading.dismiss().then(()=>{
                  this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
              });
          });  
  }

}

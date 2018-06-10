import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { IProfesor } from '../../../.history/src/interfaces/IProfesor_20180603124551';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-confirmar-clase',
  templateUrl: 'confirmar-clase.html',
})
export class ConfirmarClasePage {

  profesor: IProfesor;
  hora: string;
  fecha: string;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController,
              private afDB: AngularFireDatabase, private usuario: UsuarioProvider) {
    this.profesor = this.navParams.get("profesor");
    this.hora = this.navParams.get("hora");
    this.fecha = this.navParams.get("fecha");

    this.loading = this.loadingCtrl.create({
      content: "Por favor, espere...",
    });
  }

  confirmarClase(){
    this.loading.present();
    let idFecha =  this.fecha.replace(/\//g,"");
    idFecha += this.profesor.id;
    this.afDB.object('/horario/' + idFecha + '/submenu/' + this.hora).update({ idAlumno: this.usuario.usuario.uid})
          .then(()=>{
              this.loading.dismiss().then(()=>{
                  this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
              });
          });  
  }

}

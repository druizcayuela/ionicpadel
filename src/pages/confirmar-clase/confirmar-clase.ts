import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { IProfesor } from '../../interfaces/IProfesor';
import { AngularFireDatabase } from 'angularfire2/database';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';
import { IClaseReservada } from '../../interfaces/IClaseReservada';
import { SeleccionarProfesorProvider } from '../../providers/seleccionar-profesor/seleccionar-profesor';


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
              private afDB: AngularFireDatabase, private usuario: UsuarioProvider, private selecProf: SeleccionarProfesorProvider) {
    this.profesor = this.selecProf.profesorSeleccionado;
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
      email: this.profesor.email,
      apellidosProfesor: this.profesor.apellidos,
      fecha: this.fecha,
      hora: this.horaConFormato,
      lugar: this.profesor.lugar,
      idAlumno: this.usuario.usuario.uid,
      idProfesor: this.profesor.id,
      horaId: this.hora,
      fechaId: idFecha,
      imgProfesor: this.profesor.img,
      notas: ''
    }

    let key = this.claseReservada.idAlumno + this.claseReservada.fechaId + this.claseReservada.horaId;

    this.afDB.object( `/horario/${this.profesor.id}/${idFecha}/submenu/${this.hora}`)
          .update({ idAlumno: this.usuario.usuario.uid})
          .then(()=>{
            this.afDB.object(`/clases/${key}`).update(this.claseReservada).then(()=>{
              this.loading.dismiss().then(()=>{
                this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
              });
            });
          });  
  }

}

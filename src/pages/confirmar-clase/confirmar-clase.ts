import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, AlertController } from 'ionic-angular';
import { IProfesor } from '../../interfaces/IProfesor';
import { AngularFireDatabase } from 'angularfire2/database';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';
import { IClaseReservada } from '../../interfaces/IClaseReservada';
import { SeleccionarProfesorProvider } from '../../providers/seleccionar-profesor/seleccionar-profesor';
import { ModalDetalleProfesorPage } from '../modal-detalle-profesor/modal-detalle-profesor';


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
              private afDB: AngularFireDatabase, private usuario: UsuarioProvider, 
              private selecProf: SeleccionarProfesorProvider, private modalCtrl: ModalController,
              private alertCtrl: AlertController) {
    this.profesor = this.selecProf.profesorSeleccionado;
    this.hora = this.navParams.get("hora");
    this.fecha = this.navParams.get("fecha");
    this.horaConFormato = this.navParams.get("horaConFormato");

    this.loading = this.loadingCtrl.create({
      content: "Por favor, espere...",
    });
  }

  verDetalleProfesor(profesor: any){
    this.selecProf.cargarProfesorSeleccionado(profesor);
    let modal = this.modalCtrl.create(ModalDetalleProfesorPage);
    modal.present();
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

    this.comprobarSiLaHoraEstDisponibleParaElUsuario(key).then( (horaDisponible: boolean)=>{
      if(horaDisponible){
        this.afDB.object( `/horario/${this.profesor.id}/${idFecha}/submenu/${this.hora}`)
        .update({ idAlumno: this.usuario.usuario.uid}).then(()=>{
          this.afDB.object(`/clases/${key}`).update(this.claseReservada).then(()=>{
            this.loading.dismiss().then(()=>{
              this.presentAlert();
            });
          });
        });  
      }else{
        this.loading.dismiss().then(()=>{
          this.presentErrorAlert();
        });
      }
    });
  }

  comprobarSiLaHoraEstDisponibleParaElUsuario(key){
    return new Promise((resolve, reject)=>{
      
      this.afDB.object(`/clases/${key}`).snapshotChanges().subscribe((data)=>{
        if(JSON.stringify(data.payload) == "null"){
          resolve(true);
        }
        resolve(false);
      });
    });
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: '¡Clase reservada!',
      message: 'Puedes ver tus clases, desde el menú de navegación en Mis clases.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
          }
        }
      ]
    });
    alert.present();
  }

  presentErrorAlert() {
    let alert = this.alertCtrl.create({
      title: '¡No se pudo reservar clase!',
      message: 'Ya tienes esa hora y fecha programada con otro profesor, por favor, revisa tus clases desde Mis clases.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

}

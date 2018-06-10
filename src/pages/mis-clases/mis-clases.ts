import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { SeleccionarProfesorProvider } from '../../providers/seleccionar-profesor/seleccionar-profesor';
import { ModalDetalleProfesorPage } from '../modal-detalle-profesor/modal-detalle-profesor';
import { IClaseReservada } from '../../interfaces/IClaseReservada';
import { MandarEmailProvider } from '../../providers/mandar-email/mandar-email';


@IonicPage()
@Component({
  selector: 'page-mis-clases',
  templateUrl: 'mis-clases.html',
})
export class MisClasesPage {

  clases: Observable<any[]>;
  loading: any;
  estado: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private usuario: UsuarioProvider,
              private menuCtrl: MenuController, private afDB: AngularFireDatabase, 
              private selecProf: SeleccionarProfesorProvider, private modalCtrl: ModalController,
              private alertCtrl: AlertController, private loadingCtrl: LoadingController,
              private mandarEmail: MandarEmailProvider) {
    this.estado = "pendientes";
    this.clases = this.afDB.list('clases', 
            ref => ref.orderByChild('idAlumno').equalTo(this.usuario.usuario.uid)).valueChanges();
    this.loading = this.loadingCtrl.create({
      content: "Por favor, espere...",
    });
  }

  mostrarMenu () {
    this.menuCtrl.toggle();
  }

  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  verDetalleProfesor(id: string){
    this.afDB.object(`/profesor/${id}`).valueChanges().subscribe(data => {
      this.selecProf.cargarProfesorSeleccionado(data);
      let modal = this.modalCtrl.create(ModalDetalleProfesorPage);
      modal.present();
    });
  }

  compararFecha(clase: any){
    let from = clase.fecha.split("/");
    let fechaDB = new Date(parseInt(from[2]), parseInt(from[1]) - 1, parseInt(from[0]));

    let fechaActual = new Date();
    return fechaDB <= fechaActual;
  }

  contactar(clase: IClaseReservada){
    this.mandarEmail.mandarEmail(clase.nombreProfesor, clase.email);
  }

  guardarNotas(clase: IClaseReservada){
    console.log(clase.notas);
    this.loading.present();
    let key = clase.idAlumno + clase.fechaId + clase.horaId;
    this.afDB.object(`/clases/${key}`).update({'notas': clase.notas}).then(()=>{
      this.loading.dismiss()
    });
  }

  cancelarClase(clase: IClaseReservada){
    const confirm = this.alertCtrl.create({
      title: '¿Deseas borrar la clase?',
      message: '¿Estás seguro de borrar la clase del día ' + clase.fecha + ' ' 
      + clase.hora + ' con el profesor ' + clase.nombreProfesor + ' ' + clase.apellidosProfesor + ' ?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.loading.present();
            let key = clase.idAlumno + clase.fechaId + clase.horaId;
            
            this.afDB.object(`/horario/${clase.idProfesor}/${clase.fechaId}/submenu/${clase.horaId}`)
                .update({ idAlumno: -1})
                .then(()=>{
                  this.afDB.object(`/clases/${key}`).remove().then(()=>{
                    this.loading.dismiss().then(()=>{
                      
                    });
                  });
                }); 
              }
            }
          ]
        });
      confirm.present();
  }
  
}

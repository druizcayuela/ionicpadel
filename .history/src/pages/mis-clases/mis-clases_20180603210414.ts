import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { SeleccionarProfesorProvider } from '../../providers/seleccionar-profesor/seleccionar-profesor';
import { ModalDetalleProfesorPage } from '../modal-detalle-profesor/modal-detalle-profesor';

@IonicPage()
@Component({
  selector: 'page-mis-clases',
  templateUrl: 'mis-clases.html',
})
export class MisClasesPage {

  clases: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private usuario: UsuarioProvider,
              private menuCtrl: MenuController, private afDB: AngularFireDatabase, 
              private selecProf: SeleccionarProfesorProvider, private modalCtrl: ModalController) {

    this.clases = this.afDB.list('clases', 
            ref => ref.orderByChild('idAlumno').equalTo(this.usuario.usuario.uid)).valueChanges();
  }

  mostrarMenu () {
    this.menuCtrl.toggle();
  }

  verDetalleProfesor(id: string){
    let profesor =  this.afDB.object(`/profesor/${id}`).valueChanges().subscribe(data => {
      console.log(data);
      this.selecProf.cargarProfesorSeleccionado(data);
      let modal = this.modalCtrl.create(ModalDetalleProfesorPage);
      modal.present();
    });
  }
  
}

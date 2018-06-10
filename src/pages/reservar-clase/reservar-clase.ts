import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ModalDetalleProfesorPage } from '../modal-detalle-profesor/modal-detalle-profesor';
import { ReservarHoraPage } from '../reservar-hora/reservar-hora';
import { SeleccionarProfesorProvider } from '../../providers/seleccionar-profesor/seleccionar-profesor';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-reservar-clase',
  templateUrl: 'reservar-clase.html',
})
export class ReservarClasePage {

  profesores: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private selecProf: SeleccionarProfesorProvider,
              private modalCtrl: ModalController, private afDB: AngularFireDatabase, private usuarioProv: UsuarioProvider) {

    this.profesores = this.afDB.list('profesor').valueChanges();
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

  checkFavorito(profesor: any){
    if(profesor.favoritos){
      for (let key of Object.keys(profesor.favoritos)) {  
        let fav = profesor.favoritos[key];
        if (fav.idAlumno === this.usuarioProv.usuario.uid && fav.fav === true){
          return true;
        }
      }
    }
    return false;
  }

  agregarFavorito(profesor: any, e: any){
    e.stopPropagation();
   
    this.afDB.object(`/profesor/${profesor.id}/favoritos/${this.usuarioProv.usuario.uid}`)
      .update({idAlumno: this.usuarioProv.usuario.uid, fav: true});
  }

  quitarFavorito(profesor: any, e: any){
    e.stopPropagation();

    this.afDB.object(`/profesor/${profesor.id}/favoritos/${this.usuarioProv.usuario.uid}`)
      .update({idAlumno: this.usuarioProv.usuario.uid, fav: false});

  }

  
}

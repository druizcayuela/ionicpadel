import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-mis-clases',
  templateUrl: 'mis-clases.html',
})
export class MisClasesPage {

  clases: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private usuario: UsuarioProvider,
              private menuCtrl: MenuController, afDB: AngularFireDatabase) {

    this.clases = afDB.list('clases', 
            ref => ref.orderByChild('idAlumno').equalTo(this.usuario.usuario.uid)).valueChanges();
  }

  mostrarMenu () {
    this.menuCtrl.toggle();
  }
  
}

import { Component } from '@angular/core';
import { NavController, MenuController, AlertController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { ReservarClasePage } from '../reservar-clase/reservar-clase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  constructor(public navCtrl: NavController, public usuarioProv: UsuarioProvider, 
              private menuCtrl: MenuController, private alertCtrl: AlertController) {}

  mostrarMenu () {
    this.menuCtrl.toggle();
  }

  navegarPagina(){
    this.navCtrl.push(ReservarClasePage);
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Opción no disponible',
      subTitle: 'Estamos trabajando en ello, le informaremos en cuanto esté disponible.',
      buttons: ['OK']
    });
    alert.present();
  }
}

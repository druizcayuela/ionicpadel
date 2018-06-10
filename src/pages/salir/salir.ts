import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { LogoutProvider } from '../../providers/logout/logout';

@IonicPage()
@Component({
  selector: 'page-salir',
  templateUrl: 'salir.html',
})
export class SalirPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController,
              private logoutProvider: LogoutProvider) {
  }

  mostrarMenu () {
    this.menuCtrl.toggle();
  }

  salir(){
    this.logoutProvider.dologout().then(()=>{
      window.location.reload();
    });
  }

}

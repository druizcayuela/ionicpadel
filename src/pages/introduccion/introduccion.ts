import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AjustesProvider } from '../../providers/ajustes/ajustes';


@IonicPage()
@Component({
  selector: 'page-introduccion',
  templateUrl: 'introduccion.html',
})
export class IntroduccionPage {

  slides:any[] = [
    {
      image: "assets/imgs/1bis.jpg",
      color: "#00a68c",
    },
    {
      image: "assets/imgs/2bis.jpg",
      color: "#bc6ca7",
    },
    {
      image: "assets/imgs/3bis.jpg",
      color: "#00b9d1",
    },
    {
      image: "assets/imgs/4bis.jpg",
      color: "#ec9787",
    }
  ];
  

  constructor(public navCtrl: NavController, private _ajustes: AjustesProvider) {
  }

  saltar_tutorial() {
    this._ajustes.ajustes.mostrar_tutorial = false;
    this._ajustes.guardar_storage();
    this.navCtrl.setRoot(LoginPage)
  }

}

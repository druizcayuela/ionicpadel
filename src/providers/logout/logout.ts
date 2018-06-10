import { Injectable, ViewChild } from '@angular/core';
import {Nav} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsuarioProvider } from '../usuario/usuario';


@Injectable()
export class LogoutProvider {
  @ViewChild(Nav) nav: Nav;
  constructor(private afAuth: AngularFireAuth, 
              private usuarioProv: UsuarioProvider) {
  }

  dologout() {
    let promesa = new Promise((resolve, reject)=>{
      this.afAuth.auth.signOut().then( res => {
        this.usuarioProv.usuario = {};
        resolve();
      });
    });
    return promesa;
  }
}

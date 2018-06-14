import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook';

import { IntroduccionPage } from '../introduccion/introduccion';

import { GooglePlus } from '@ionic-native/google-plus';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private googlePlus: GooglePlus, 
    public usuarioProv: UsuarioProvider, private platform: Platform, private fb: Facebook) {


  }

  mostrarIntroduccion(){
    this.navCtrl.setRoot(IntroduccionPage);
  }

  signInGoogle(){
    if (this.platform.is('cordova')){
      this.googlePlus.login({
        'webClientId': '642712311280-e30crakpmq4veu43aoa8bfjkvhqcmsfs.apps.googleusercontent.com',
        'offline': true
      }).then( res => {
        
        firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then( user => {
          console.log(JSON.stringify(user));
    
                this.usuarioProv.cargarUsuario(
                  user.displayName,
                  user.email,
                  user.photoURL,
                  user.uid,
                  'google'
                );
        
                this.navCtrl.setRoot(HomePage);
        }).catch( error => console.log("Firebase failure: " + JSON.stringify(error)));
      }).catch(err => console.error("Error: " + JSON.stringify(err))) ;
    }else{
      //Desktop
      this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(res => {
        let user = res.user;
        this.usuarioProv.cargarUsuario(
          user.displayName,
          user.email,
          user.photoURL+"?height=500",
          user.uid,
          'google'
        );
        this.navCtrl.setRoot(HomePage);
      }).catch(e => console.log('Error con el login de Google en modo escritorio' + JSON.stringify(e)));
    }
  }

  signInWithFacebook() {

    if (this.platform.is('cordova')){

      this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential)
            .then( user => {
              this.usuarioProv.cargarUsuario(
                user.displayName,
                user.email,
                user.photoURL,
                user.uid,
                'facebook'
              );
      
              this.navCtrl.setRoot(HomePage);


            }).catch(e => console.log('Error con el login de FB en modo nativo' + JSON.stringify(e)));
      })
    }else{
      //Escritorio
      this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => {
        let user = res.user;
        this.usuarioProv.cargarUsuario(
          user.displayName,
          user.email,
          user.photoURL+"?height=500",
          user.uid,
          'facebook'
        );
        this.navCtrl.setRoot(HomePage);
      }).catch(e => console.log('Error con el login de FB en modo escritorio' + JSON.stringify(e)));
    }


  }

}

import { Injectable } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { EmailComposer } from '@ionic-native/email-composer';
import { Platform } from 'ionic-angular';
import { UsuarioProvider } from '../usuario/usuario';

@Injectable()
export class MandarEmailProvider {

  constructor(private iab: InAppBrowser, private emailComposer: EmailComposer, private platform: Platform,
              private usuario: UsuarioProvider) {
    console.log('Hello MandarEmailProvider Provider');
  }

  mandarEmail(nombreProfesor: string, emailProfesor: string){

    if (this.platform.is('cordova')){
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Podemos mandarlo con el plugin nativo de email
        let email = {
          to: emailProfesor,
          subject: 'Pregunta de ' + this.usuario.usuario.nombre,
          body: 'Buenas profesor ' + nombreProfesor + ' , necesito hacerte la siguiente pregunta.',
          isHtml: true
        };
        this.emailComposer.open(email);
        return;
      }
     });
    }

     //Sino esta disponible, mandamos con un comando HTML5
     let htmlLink = "mailto:" + emailProfesor + "?subject=Pregunta de "+ this.usuario.usuario.nombre 
     + "&body=Buenas profesor " + nombreProfesor + " , necesito hacerte la siguiente pregunta.";
     htmlLink = htmlLink.replace(/ /g, "%20");
     this.iab.create( htmlLink, "_system" );
  }

}

import { Component } from '@angular/core';
import { Platform, MenuController, AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { IntroduccionPage } from '../pages/introduccion/introduccion';
import { AjustesProvider } from '../providers/ajustes/ajustes';
import { MisClasesPage } from '../pages/mis-clases/mis-clases';
import { MiPerfilPage } from '../pages/mi-perfil/mi-perfil';
import { SalirPage } from '../pages/salir/salir';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  salir = SalirPage
  home = HomePage;
  misClases = MisClasesPage;
  miPerfil = MiPerfilPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
              private _ajustes: AjustesProvider, private menuCtrl: MenuController,
              private alertCtrl: AlertController) {
    platform.ready().then(() => {

      var OneSignal = window['OneSignal'] || [];
      console.log("Init OneSignal");
      OneSignal.push(["init", {
        appId: "c7c8c6f3-098d-4b39-9281-100ef31398c3",
        autoRegister: false,
        allowLocalhostAsSecureOrigin: true,
        notifyButton: {
          enable: false
        }
      }]);
      console.log('OneSignal Initialized');
      OneSignal.push(function () {
        console.log('Register For Push');
        OneSignal.push(["registerForPushNotifications"])
      });
      OneSignal.push(function () {
        // Occurs when the user's subscription changes to a new value.
        OneSignal.on('subscriptionChange', function (isSubscribed) {
          console.log("The user's subscription state is now:", isSubscribed);
          OneSignal.getUserId().then(function (userId) {
            console.log("User ID is", userId);
          });
        });
      });


      this._ajustes.cargar_storage().then(()=>{
        if(this._ajustes.ajustes.mostrar_tutorial){
          this.rootPage = IntroduccionPage;
        }else{
          this.rootPage = LoginPage;
        }
        statusBar.styleDefault();
        splashScreen.hide();
      });
    });
  }

  abrirPagina(pagina:any){
    this.rootPage = pagina;
    this.menuCtrl.close();
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Opcion no disponible',
      subTitle: 'Estamos trabajando en ello, le informaremos en cuanto esté disponible.',
      buttons: ['OK']
    });
    alert.present();
  }

}


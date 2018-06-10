import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { IntroduccionPage } from '../pages/introduccion/introduccion';
import { ReservarClasePage } from '../pages/reservar-clase/reservar-clase';
import { MisClasesPage } from '../pages/mis-clases/mis-clases';
import { ModalDetalleProfesorPage } from '../pages/modal-detalle-profesor/modal-detalle-profesor';
import { ReservarHoraPage } from '../pages/reservar-hora/reservar-hora';
import { ConfirmarClasePage } from '../pages/confirmar-clase/confirmar-clase';
import { MiPerfilPage } from '../pages/mi-perfil/mi-perfil';


//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//Providers
import { UsuarioProvider } from '../providers/usuario/usuario';
import { AjustesProvider } from '../providers/ajustes/ajustes';
import { SeleccionarProfesorProvider } from '../providers/seleccionar-profesor/seleccionar-profesor';
import { MandarEmailProvider } from '../providers/mandar-email/mandar-email';

//Plugins
import { Facebook} from '@ionic-native/facebook';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { EmailComposer } from '@ionic-native/email-composer';
import { PipesModule } from '../pipes/pipes.module';
import { LogoutProvider } from '../providers/logout/logout';
import { SalirPage } from '../pages/salir/salir';
import { GooglePlus } from '@ionic-native/google-plus';


export const firebaseConfig = {
  apiKey: "AIzaSyDYx2W57NIEKYYSO3ikuUqJE_Oq8yS_NWs",
  authDomain: "padelconnect-a43ff.firebaseapp.com",
  databaseURL: "https://padelconnect-a43ff.firebaseio.com",
  projectId: "padelconnect-a43ff",
  storageBucket: "",
  messagingSenderId: "642712311280"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    IntroduccionPage,
    ReservarClasePage,
    MisClasesPage,
    ModalDetalleProfesorPage,
    ReservarHoraPage,
    ConfirmarClasePage,
    MiPerfilPage,
    SalirPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Volver'
    }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    IntroduccionPage,
    ReservarClasePage,
    MisClasesPage,
    ModalDetalleProfesorPage,
    ReservarHoraPage,
    ConfirmarClasePage,
    MiPerfilPage,
    SalirPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    Facebook,
    GooglePlus,
    AjustesProvider,
    SeleccionarProfesorProvider,
    InAppBrowser,
    EmailComposer,
    MandarEmailProvider,
    LogoutProvider
  ]
})
export class AppModule {}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-elegir-ciudad',
  templateUrl: 'elegir-ciudad.html',
})
export class ElegirCiudadPage {

  ciudades: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDB: AngularFireDatabase) {
    this.ciudades = this.afDB.list('ciudades').valueChanges();
  }

  seleccionarCiudad(nombreCiudad){
    this.navCtrl.pop().then(() => {
      this.navParams.get('callback')(nombreCiudad);
    });
  }

}

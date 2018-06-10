import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IProfesor } from '../../interfaces/IProfesor';
import { AngularFireDatabase } from 'angularfire2/database';
import { ConfirmarClasePage } from '../confirmar-clase/confirmar-clase';
import { SeleccionarProfesorProvider } from '../../providers/seleccionar-profesor/seleccionar-profesor';

@IonicPage()
@Component({
  selector: 'page-reservar-hora',
  templateUrl: 'reservar-hora.html',
})
export class ReservarHoraPage {

  profesor: IProfesor;
  lastKey: string = null;
  horarios: any[] = [];
  hayMas:boolean = true;

  horariosBackup: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private afDB: AngularFireDatabase, private selecProf : SeleccionarProfesorProvider) {

    this.profesor = this.selecProf.profesorSeleccionado;
    this.cargar_primera_hora();
  }

  private cargar_primera_hora(){
      return this.afDB.list(`/horario/${this.profesor.id}`, ref=>ref.orderByKey().limitToFirst(1))
                      .valueChanges()
                      .subscribe( (horario:any)=>{
                        
                        this.lastKey = horario[0].id;
                        this.horarios.push(horario[0]);

                        this.cargar_mas_horas();
                      });
  }

  cargar_mas_horas(){
    return new Promise( (resolve, reject)=>{
      this.afDB.list(`/horario/${this.profesor.id}`, ref=>ref.limitToFirst(4).orderByKey().startAt(this.lastKey))
      .valueChanges()
      .subscribe( (horario:any)=>{
         
         horario.shift();

         if(horario.length == 0){
           console.log("Ya no hay mas registros");
           resolve(false);
           return;
         }

         this.lastKey = horario[horario.length - 1].id;
         for (let i = 0; i < horario.length; i++){
          this.horarios.push(horario[i]);
         }

         this.horariosBackup = this.horarios;
         resolve(true);
      });
    });
  }

  seleccionarHora(fecha: string, hora: string, horaConFormato: string){
    this.navCtrl.push(ConfirmarClasePage, 
                        {'fecha': fecha,
                         'horaConFormato' : horaConFormato,
                         'hora': hora});
  }

  doRefresh(refresher) {
    this.cargar_mas_horas().then((hayMas:boolean)=>{
      this.hayMas = hayMas;
      refresher.complete();
    });
  }

  tieneHoraDisponible(horario:any){
    for (let key of Object.keys(horario)) {  
      let hora = horario[key];
      if (hora.idAlumno === -1){
        return true;
      }
    }
    return false;
  }

  initializeItems(){
    this.horarios = this.horariosBackup;
  }

  doInfinite(infiniteScroll) {
    this.cargar_mas_horas().then((hayMas:boolean)=>{
      this.hayMas = hayMas;
      infiniteScroll.complete();
    });
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.horarios = this.horarios.filter((item) => {
        return (item.fecha.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
  
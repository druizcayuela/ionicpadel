import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { UsuarioProvider, Credenciales } from '../../providers/usuario/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-mi-perfil',
  templateUrl: 'mi-perfil.html',
})
export class MiPerfilPage {

  perfil: Credenciales;
  myForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController,
              private usuario: UsuarioProvider, private formBuilder: FormBuilder, private afDB: AngularFireDatabase,
              private toastCtrl: ToastController) {

      this.perfil = this.usuario.usuario;
      this.myForm = this.createMyForm();
      this.cargar_datos().then((data: any)=>{
        if(data){
          this.myForm.patchValue({
            nombre: data.nombre,
            apellidos: data.apellidos,
            telefono: data.telefono,
            posicion: data.posicion
          })
        }
      }); 
  }

  mostrarMenu () {
    this.menuCtrl.toggle();
  }

  private createMyForm(){
    return this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: [''],
      telefono: ['', Validators.required],
      posicion: [''],
    });
  }

  showToastWithCloseButton() {
    const toast = this.toastCtrl.create({
      message: 'Datos guardados correctamente',
      showCloseButton: true,
      closeButtonText: 'Ok',
      cssClass: 'toast-success'
    });
    toast.present();
  }

    cargar_datos(){

        let promesa = new Promise((resolve, reject)=>{
            //Dispositivo
            this.afDB.list('usuarios', 
              ref => ref.orderByChild('id').equalTo(this.perfil.uid)).valueChanges().subscribe(function (data){
                let n: any;
                if(data && data[0]){
                  n = data[0];
                }
                resolve(n);
              });
        });
    
        return promesa;
      }

  saveData(){
   
    let usuarioBBDD = {
      id: this.perfil.uid,
      img: this.perfil.imagen,
      email: this.perfil.email,
      nick: this.perfil.nombre,
      provider: this.perfil.provider,
      nombre: this.myForm.value.nombre,
      apellidos: this.myForm.value.apellidos,
      telefono: this.myForm.value.telefono,
      posicion: this.myForm.value.posicion
    }
    this.afDB.object(`/usuarios/${usuarioBBDD.id}`).update(usuarioBBDD).then(()=>{
      this.showToastWithCloseButton();
    });
  }
}

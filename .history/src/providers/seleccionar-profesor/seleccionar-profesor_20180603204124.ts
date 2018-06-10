import { Injectable } from '@angular/core';
import { IProfesor } from '../../interfaces/IProfesor';


@Injectable()
export class SeleccionarProfesorProvider {

  profesorSeleccionado: IProfesor;

  constructor() {
    console.log('Hello SeleccionarProfesorProvider Provider');
  }

  cargarProfesorSeleccionado(profesor: any){
    this.profesorSeleccionado = {
      nombre: profesor.nombre,
      apellidos: profesor.apellidos,
      email: profesor.email,
      img: profesor.img,
      telefono: profesor.telefono,
      lugar: profesor.lugar,
      id: profesor.id
    }
  }

}

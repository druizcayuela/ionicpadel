import { Injectable } from '@angular/core';
import { IProfesor } from '../../interfaces/IProfesor';


@Injectable()
export class SeleccionarProfesorProvider {

  profesorSeleccionado: IProfesor;

  constructor() {
    console.log('Hello SeleccionarProfesorProvider Provider');
  }

}

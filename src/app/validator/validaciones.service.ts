import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  constructor() { }

  camposIguales( campo1: string, campo2: string ) {
    return ( formGroup: AbstractControl ): ValidationErrors | null => {
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;
      if ( pass1 !== pass2 ) {
        formGroup.get(campo2)?.setErrors({  cedula: false});
        return {  cedula: false}
      } 
      formGroup.get(campo2)?.setErrors(null);
      return null
    }
  }


 

}

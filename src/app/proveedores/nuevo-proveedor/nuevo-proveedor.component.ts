import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { emailPattern, nombreApellidoPattern } from '../../validator/Validaciones';
import { Proveedor } from '../../model/TODO';


@Component({
  selector: 'app-nuevo-proveedor',
  templateUrl: './nuevo-proveedor.component.html',
  styleUrls: ['./nuevo-proveedor.component.css']
})
export class NuevoProveedorComponent {


  formularioProveedor: FormGroup = this.fb.group({
    cedula: ['', [Validators.required, Validators.maxLength(10), this.verificarCedula]],
    nombres: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern(nombreApellidoPattern)]],
    apellidos: ['', []],
    telefono: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15)]],
    direccion: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    correo: ['', [Validators.required, Validators.pattern(emailPattern)]],
  });

  constructor(private http: HttpClient,
    private fb: FormBuilder,
    private router: Router) { }


  guardarProveedor() {
    if (!this.formularioProveedor.invalid) {
      const { cedula, nombres, apellidos, telefono, direccion, correo } = this.formularioProveedor.value;

      const prove: Proveedor = {
        "cedula": cedula,
        "nombres": nombres,
        "apellidos": apellidos || 'none',
        "telefono": telefono,
        "direccion": direccion,
        "correo": correo
      };


      this.http.post<any>(environment.ip + 'usuario/guardarProveedor', prove, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }).subscribe(data => {
        this.formularioProveedor.reset();
        if (data.codigo == 1) {

          Swal.fire('Creacion Correcta', data.mensaje, 'success').
            then(result => {
              if (result.value) {
                this.router.navigate(['/proveedor/proveedores']);
              }
            });
        } else {
          Swal.fire('Error en la Creacion', data.mensaje, 'warning')
        }
      });

    } else {
      Swal.fire('Error, Campos Vacios', 'Por favor, Llene los Campos', 'error')
    }
  }





  cancelar() {

    //  this.formularioProveedor.reset();
    this.router.navigate(['/proveedor/proveedores']);
  }

  // limpiarProveedor() {
  //   this.formularioProveedor.reset();
  // }


  campoNoValido(campo: string) {
    return this.formularioProveedor.get(campo)?.invalid
      && this.formularioProveedor.get(campo)?.touched;
  }

  validarCedula(campo: string) {
    return this.formularioProveedor.controls[campo].errors
      && this.formularioProveedor.controls[campo].touched;
  }

  verificarCedula(control: FormControl) {
    const valor: string = control.value?.trim();
    if (valor) {
      let tercerDigito = parseInt(valor.substring(2, 3));
      if (tercerDigito < 6) {
        // El ultimo digito se lo considera dígito verificador
        let coefValCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];
        let verificador = parseInt(valor.substring(9, 10));
        let suma: number = 0;
        let digito: number = 0;
        for (let i = 0; i < (valor.length - 1); i++) {
          digito = parseInt(valor.substring(i, i + 1)) * coefValCedula[i];
          suma += ((parseInt((digito % 10) + '') + (parseInt((digito / 10) + ''))));
        }
        suma = Math.round(suma);
        if ((Math.round(suma % 10) == 0) && (Math.round(suma % 10) == verificador)) {
          return null;

        } else if ((10 - (Math.round(suma % 10))) == verificador) {
          return null;
        } else {
          return {
            cedula: false
          }
        }
      } else {
        return {
          cedula: false
        }
      }
    } else {
      return {
        cedula: false
      }
    }
  }




}

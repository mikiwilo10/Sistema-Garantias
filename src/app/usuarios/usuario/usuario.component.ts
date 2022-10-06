import { Component, ViewChild, ElementRef } from '@angular/core';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { nombreApellidoPattern } from '../../../app/validator/Validaciones';
import { emailPattern, validarPassword } from '../../validator/Validaciones';
import { ValidacionesService } from '../../validator/validaciones.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Usuario } from '../../model/TODO';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {


  formularioUsuario: FormGroup = this.fb.group({
    cedula: ['', [Validators.required, Validators.maxLength(10), this.verificarCedula]],
    nombres: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern(nombreApellidoPattern)]],
    apellidos: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern(nombreApellidoPattern)]],
    telefono: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15) ]],
    direccion: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    correo: ['', [Validators.required, Validators.pattern(emailPattern)]],
    password: ['', [Validators.required, Validators.pattern(validarPassword)]],
    password2: ['', [Validators.required]],
  },
    { validators: [this.validadiionesService.camposIguales('password', 'password2')] });

  constructor(private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private validadiionesService: ValidacionesService) { }



  agregarusuario() {
    if (this.formularioUsuario.invalid) {
      Swal.fire('Error en la Creacion', "Campos Vacios", 'error');
    } else {
      const { cedula, nombres, apellidos, telefono, direccion, correo, password } = this.formularioUsuario.value;

      const usuarioEnvio: Usuario = {
        "cedula": cedula,
        "nombres": nombres,
        "apellidos": apellidos,
        "telefono": telefono,
        "direccion": direccion,
        "correo": correo,
        "contrasena": password
      };

      this.http.post<any>(environment.ip + 'usuario/guardarUsuario', usuarioEnvio, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }).subscribe(data => {
        if (data.codigo == 1) {

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Creacion Correcta',
            showConfirmButton: false,
            timer: 1500
          });
          this.formularioUsuario.reset();
          this.router.navigate(['/usuario/listar']);

        } else {
          Swal.fire('Error en la Creacion', data.mensaje, 'warning');
          //this.formularioUsuario.reset();
        }
      });
    }

  }

  campoNoValido(campo: string) {
    return this.formularioUsuario.get(campo)?.invalid
      && this.formularioUsuario.get(campo)?.touched;
  }

  validarCedula(campo: string) {
    return this.formularioUsuario.controls[campo].errors
      && this.formularioUsuario.controls[campo].touched;
  }



  cancelar() {
    this.formularioUsuario.reset();
    this.router.navigate(['/usuario/listar']);
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




















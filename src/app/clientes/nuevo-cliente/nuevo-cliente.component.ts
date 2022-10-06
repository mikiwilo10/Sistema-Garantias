import { Component } from '@angular/core';
import { ServicioClienteService } from '../service/servicio-cliente.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { emailPattern, nombreApellidoPattern } from '../../validator/Validaciones';
import { Cliente } from '../../model/TODO';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css']
})
export class NuevoClienteComponent {

  constructor(private clienteService: ServicioClienteService,
              private router: Router,
              private fb: FormBuilder) { }





  miFormulario: FormGroup = this.fb.group({
    cedula: ['', [Validators.required, Validators.maxLength(10), this.verificarCedula],],
    nombres: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern(nombreApellidoPattern)]],
    apellidos: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern(nombreApellidoPattern)]],
    telefono: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15)]],
    direccion: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    correo: ['', [Validators.required, Validators.pattern(emailPattern)],],
  });

  crearCliente() {

    if (this.miFormulario.invalid) {
      Swal.fire('Error, Campos Vacios', 'Por favor, Llene los Campos', 'error')
    } else {

      const { cedula, nombres, apellidos, telefono, direccion, correo,  } = this.miFormulario.value;
      const client: Cliente = {
        cedula: cedula,
        nombres: nombres,
        apellidos: apellidos,
        telefono: telefono,
        direccion: direccion,
        correo: correo
      };

      this.clienteService.crearCliente(client).subscribe(
        data => {
          if (data.codigo == 1) {
            this.miFormulario.reset();
            Swal.fire('Ingreso Correcto', 'Cliente Ingresado Correctamente', 'success');
            this.router.navigate(['/cliente/listar']);
          } else {
            Swal.fire('Error en el Ingreso', data.mensaje, 'warning')
          }
        });
    }

  }




  validarCedula(campo: string) {
    return this.miFormulario.controls[campo].errors
      && this.miFormulario.controls[campo].touched;
  }



  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('correo')?.errors;
    if (errors?.required) {
      return 'Email es obligatorio';
    } else if (errors?.pattern) {
      return 'El valor ingresado no tiene formato de correo';
    } else if (errors?.emailTomado) {
      return 'El email ya fue tomado';
    }

    return '';
  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid
      && this.miFormulario.get(campo)?.touched;
  }


  cancelar() {
   this.miFormulario.reset();
    this.router.navigate(['/cliente/listar']);
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

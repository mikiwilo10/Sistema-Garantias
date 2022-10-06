import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProductoService } from '../../producto/service/producto.service';
import { ProveedorService } from '../../proveedores/service/proveedor.service';
import { emailPattern, nombreApellidoPattern } from '../../validator/Validaciones';
import { ImprimirOrdenComponent } from '../../inicio/imprimir-orden/imprimir-orden.component';
import { Categoria, Cliente, OrdenTrabajo, Proveedor } from '../../model/TODO';
import { ServicioClienteService } from '../../clientes/service/servicio-cliente.service';
import { data } from 'jquery';

@Component({
  selector: 'app-crear-orden',
  templateUrl: './crear-orden.component.html',
  styleUrls: ['./crear-orden.component.css']
})
export class CrearOrdenComponent implements OnInit {

  @ViewChild(ImprimirOrdenComponent) hijo: ImprimirOrdenComponent;

  @ViewChild('txtnombreEquipo') txtnombreEquipo!: ElementRef<HTMLInputElement>;
  @ViewChild('txtnumeroSerie') txtnumeroSerie!: ElementRef<HTMLInputElement>;
  @ViewChild('txtmarca') txtmarca!: ElementRef<HTMLInputElement>;
  @ViewChild('txtmodelo') txtmodelo!: ElementRef<HTMLInputElement>;
  @ViewChild('txtobservaciones') txtobservaciones!: ElementRef<HTMLInputElement>;

  @ViewChild('txtnumeroFactura') txtnumeroFactura!: ElementRef<HTMLInputElement>;
  @ViewChild('txtmontoFactura') txtmontoFactura!: ElementRef<HTMLInputElement>;
  @ViewChild('txtfechaFactura') txtfechaFactura!: ElementRef<HTMLInputElement>;

  nombreEquipo: string;
  numeroSerie: string;
  marca: string;
  modelo: string;
  observacionesEquipo: string;

  numeroFactura: string;
  montoFactura: number;
  fechaFactura: Date;
  aniosGarantia: number = 1;

  cliente: Cliente;
  categoria: string;
  proveedor: Proveedor;
  lugargarantia: string;

  listaProveedor: Proveedor[] = [];
  listaCategorias: Categoria[] = [];
  LugarGarantgia: string[] = ['Cliente', 'Proveedor'];


  formularioCliente: FormGroup = this.fb.group({
    cedula: ['', [Validators.required, Validators.maxLength(10), this.verificarCedula]],
    nombres: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern(nombreApellidoPattern)]],
    apellidos: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern(nombreApellidoPattern)]],
    telefono: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15)]],
    direccion: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    correo: ['', [Validators.required, Validators.pattern(emailPattern)]],
  });

  // formularioOrden: FormGroup = this.fb.group({
  //   nombreEquipo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
  //   numeroSerie: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
  //   marca: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
  //   modelo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
  //   observaciones: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
  //   numeroFactura: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
  //   montoFactura: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(8)]],
  //   fechaFactura: ['', [Validators.required,]],
  //   aniosGarantia: [1, [Validators.required, Validators.maxLength(3)]],
  // });

  formularioProveedor: FormGroup = this.fb.group({
    cedulap: ['', Validators.required],
    nombresp: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern(nombreApellidoPattern)]],
    apellidosp: ['', []],
    telefonop: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15)]],
    direccionp: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    correop: ['', [Validators.required, Validators.pattern(emailPattern)]],
  });


  ngOnInit(): void {
    this.listarProveedor_Categoria();
  }


  constructor(private http: HttpClient,
    private router: Router,
    private serviceProveedor: ProveedorService,
    private serviceProducto: ProductoService,
    private serviceCliente: ServicioClienteService,
    private fb: FormBuilder) { }



  addOrdenTrabajo() {
    const validacion = this.validarCampos();

    if (!validacion) {
      Swal.fire('Error, Campos Vacios', 'Por favor, Llene los Campos', 'error')
    } else {

      const idUsuario = Number(localStorage.getItem('id'));

      const { cedula, nombres, apellidos, telefono, direccion, correo } = this.formularioCliente.value;
      const { cedulap, nombresp, apellidosp, telefonop, direccionp, correop } = this.formularioProveedor.value;

      const userPrueba: OrdenTrabajo =
      {
        "nombreEquipo": this.nombreEquipo,
        "numeroSerie": this.numeroSerie,
        "marca": this.marca,
        "modelo": this.modelo,
        "categoria": this.categoria,
        "observacionesEquipo": this.observacionesEquipo,
        "numeroFactura": this.numeroFactura,
        "fecha": this.fechaFactura,
        "montoFactura": this.montoFactura,
        "fechaFactura": this.fechaFactura,
        "aniosGarantia": this.aniosGarantia,
        "tipoGarantia": this.lugargarantia,
        "usuario": {
          "idUsuario": idUsuario
        },
        "cliente": {
          "cedula": cedula,
          "nombres": nombres,
          "apellidos": apellidos,
          "telefono": telefono,
          "direccion": direccion,
          "correo": correo
        },
        "proveedor": {
          "cedula": cedulap,
          "nombres": nombresp,
          "apellidos": apellidosp || 'none',
          "telefono": telefonop,
          "direccion": direccionp,
          "correo": correop
        }
      };
      console.log(userPrueba);


      this.http.post<any>(environment.ip + 'orden/guardar',
        userPrueba, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }).subscribe(
        data => {
          if (data.codigo == 1) {
            this.limpiarCampos();
            Swal.fire('Creacion Correcta', 'Su Orden fue Ingresada', 'success');
            this.router.navigate(['/orden/listar']);
          } else {
            Swal.fire('Error en la Creacion', data.mensaje, 'warning')
          }
          if (data.codigo == 2) {
            Swal.fire('Su Garantia No se Ingreso', data.mensaje, 'info');
          }
        });

    }
  }

  buscarCliente() {
    const { cedula } = this.formularioCliente.value;
    if (cedula != null) {

      // this.http.get<Cliente>(environment.ip + 'usuario/clienteCedula?cedula=' + cedula)
      this.serviceCliente.buscarCliente(cedula)
        .subscribe(data => {
          if (data != null) {
            this.formularioCliente.reset({
              cedula: data.cedula,
              nombres: data.nombres,
              apellidos: data.apellidos,
              telefono: data.telefono,
              direccion: data.direccion,
              correo: data.correo,
            });
          } else {
            this.formularioCliente.reset();
            Swal.fire('No existe el Cliente');
          }
        });
    }
  }

  capturar() {
    this.formularioProveedor.reset({
      cedulap: this.proveedor.cedula,
      nombresp: this.proveedor.nombres,
      apellidosp: this.proveedor.apellidos || 'none',
      telefonop: this.proveedor.telefono,
      direccionp: this.proveedor.direccion,
      correop: this.proveedor.correo,
    });
  }


  listarProveedor_Categoria() {
    this.serviceProveedor.listarProveedor().subscribe(data => {
      this.listaProveedor = data;
    }, (err) => {
      console.log(err);
    });


    this.serviceProducto.listaCategoria().subscribe(datos => {
      this.listaCategorias = datos;
    });
  }

  campoNoValido(campo: string) {
    return this.formularioCliente.get(campo)?.invalid
      && this.formularioCliente.get(campo)?.touched;
  }

  validarCedula(campo: string) {
    return this.formularioCliente.controls[campo].errors
      && this.formularioCliente.controls[campo].touched;
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

  limpiarCampos() {
    this.formularioCliente.reset();
    this.formularioProveedor.reset();
    this.txtnombreEquipo.nativeElement.value = '';
    this.txtnumeroSerie.nativeElement.value = '';
    this.txtmarca.nativeElement.value = '';
    this.txtmodelo.nativeElement.value = '';
    this.txtobservaciones.nativeElement.value = '';
    this.txtnumeroFactura.nativeElement.value = '';
    this.txtmontoFactura.nativeElement.value = '';
  }

  validarCampos() {
    if (
      this.txtnombreEquipo.nativeElement.value == '' ||
      this.txtnombreEquipo.nativeElement.value == undefined
      ||
      this.txtnumeroSerie.nativeElement.value == '' ||
      this.txtnumeroSerie.nativeElement.value == undefined
      ||
      this.txtmarca.nativeElement.value == '' ||
      this.txtmarca.nativeElement.value == undefined
      ||
      this.txtmodelo.nativeElement.value == '' ||
      this.txtmodelo.nativeElement.value == undefined
      ||
      this.txtobservaciones.nativeElement.value == '' ||
      this.txtobservaciones.nativeElement.value == undefined
      ||
      this.txtnumeroFactura.nativeElement.value == '' ||
      this.txtnumeroFactura.nativeElement.value == undefined

      ||
      this.txtmontoFactura.nativeElement.value == '' ||
      this.txtmontoFactura.nativeElement.value == undefined
      ||
      this.formularioProveedor.invalid
      &&
      this.formularioCliente.invalid

    ) {
      return false;
    } else {
      return true;
    }

  }

  cancelar() {
    this.limpiarCampos();
    this.router.navigate(['/orden/listar']);
  }


}


import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OrdenTrabajoService } from '../../service/orden-trabajo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { nombreApellidoPattern, emailPattern } from '../../../validator/Validaciones';
import Swal from 'sweetalert2';
import { EntregaProducto } from '../../../model/TODO';
import { ServicioClienteService } from '../../../clientes/service/servicio-cliente.service';

@Component({
  selector: 'app-entrega-producto',
  templateUrl: './entrega-producto.component.html',
  styleUrls: ['./entrega-producto.component.css']
})
export class EntregaProductoComponent implements OnInit {

  public ubicaciones: string[] = ['Oficina', 'Proveedor', 'Marca'];
  idOrden: number;
  previsualizacion:any;
  constructor(
    public dialogRef: MatDialogRef<EntregaProductoComponent>,
    private ordenService: OrdenTrabajoService,
    private serviceCliente: ServicioClienteService,
    private fb: FormBuilder) { }

  ngOnInit(): void {

  }


  cancelar(): void {
    this.dialogRef.close();
  }


  formularioCliente: FormGroup = this.fb.group({
    cedula: ['', [ Validators.maxLength(10)]],
    nombres: ['', [  Validators.maxLength(20), Validators.pattern(nombreApellidoPattern)]],
    apellidos: ['', [  Validators.maxLength(20), Validators.pattern(nombreApellidoPattern)]],
    telefono: ['', [  Validators.maxLength(15)]],
    correo: ['', [ Validators.pattern(emailPattern)]],
    Descripcion: ['', []],
    Ubicacion: ['', []],
  });

  guardarDetalle() {

    const idOrden = this.ordenService.IDorden;

    const { cedula, nombres, apellidos, telefono, correo, Descripcion, Ubicacion } = this.formularioCliente.value;
    const EntregaProducto: EntregaProducto = {
      "nombres": nombres,
      "apellidos": apellidos,
      "cedula": cedula,
      "telefono": telefono,
      "correo": correo,
      "ubicacion": Ubicacion,
      "descripcion": Descripcion,
      "imagen": this.previsualizacion || null,
      "idOrdenTrabajo": idOrden,
    };
    console.log(EntregaProducto);

    this.ordenService.entregarProducto(EntregaProducto).subscribe(
        data => {
          if (data.codigo == 1) {
            this.formularioCliente.reset();
            Swal.fire('Creacion Correcta', 'Producto fue Entregado ', 'success');
            this.dialogRef.close();
          } else {
            Swal.fire('Error en la Creacion', data.mensaje, 'warning')
          }
        
        });
  }


  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.previsualizacion=reader.result;
    };
  }

  buscarCliente() {
    const { cedula } = this.formularioCliente.value;
    if (cedula != null) {
      this.serviceCliente.buscarCliente(cedula).subscribe(
        data => {
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

}

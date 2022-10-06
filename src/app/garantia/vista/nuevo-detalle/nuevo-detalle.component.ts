import { Component, OnInit } from '@angular/core';
import { MatDialogRef, } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { OrdenTrabajoService } from '../../service/orden-trabajo.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Detalle, HistorialEstado } from '../../../model/TODO';


@Component({
  selector: 'app-nuevo-detalle',
  templateUrl: './nuevo-detalle.component.html',
  styleUrls: ['./nuevo-detalle.component.css']
})
export class NuevoDetalleComponent implements OnInit {

  public previsualizacion: string;
  public nombreEstadoActual: string;
  public ubicaciones: string[] = ['Oficina', 'Proveedor', 'Marca'];
  public estado: HistorialEstado[] = [];

  constructor(
    public dialogRef: MatDialogRef<NuevoDetalleComponent>,
    private fb: FormBuilder,
    private router: Router,
    private ordenService: OrdenTrabajoService,
    private sanitizer: DomSanitizer
  ) { }


  ngOnInit() {
   this.listarEstador();
  }

  newPostForm: FormGroup = this.fb.group({
    Descripcion: ['', [Validators.required, Validators.minLength(3)]],
    Ubicacion: ['', [Validators.required, Validators.minLength(3)]],
    estado: ['', [Validators.required,]],
  });

  cancelar(): void {
    this.dialogRef.close();
  }

  listarEstador(){
    this.ordenService.listaEstadosHistoria().subscribe(datos => {
      this.estado = datos;
    });
  }

  capturarFile(event): any {
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
    });

  }


  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  });

  guardarDetalle() {
    const idOrden = this.ordenService.IDorden;
    const { Descripcion, Ubicacion, estado } = this.newPostForm.value;
    const detalle: Detalle = {
      "ubicacion": Ubicacion,
      "descripcion": Descripcion,
      "imagen": this.previsualizacion || null,
      "idOrdenTrabajo": idOrden,
      "idHistorialEstado": estado
    };
    if (this.newPostForm.invalid) {
      Swal.fire('Error, Campos Vacios', 'Por favor, Llene los Campos', 'error');
    } else {
      this.ordenService.guardar(detalle).subscribe(data => {

        if (data.codigo == 1) {

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Detalle Ingresado Correctamente',
            showConfirmButton: false,
            timer: 1500
          });

          this.newPostForm.reset();
          this.dialogRef.close();
          this.router.navigate(['/orden/listar']);
        } else {
          Swal.fire('Error', 'No se pudo ingresar', 'error')
        }
      });

    }
  }


  ValidarCampos(campo: string) {
    return this.newPostForm.controls[campo].errors
      && this.newPostForm.controls[campo].touched;
  }

}

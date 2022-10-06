import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OrdenTrabajoService } from '../service/orden-trabajo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ListarProductoComponent } from '../../producto/listar-producto/listar-producto.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambio-producto',
  templateUrl: './cambio-producto.component.html',
  styleUrls: ['./cambio-producto.component.css']
})
export class CambioProductoComponent implements OnInit {

  @ViewChild('numeroserie') numeroserie!: ElementRef<HTMLInputElement>;

  idOrdenTrabajo: number;
  idProductoCambio: number;

  formularioProducto: FormGroup = this.fb.group({
    serie: ['', [Validators.required, Validators.minLength(3)]],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    marca: ['', [Validators.required, Validators.minLength(3)]],
    modelo: ['', [Validators.required, Validators.minLength(3)]],
  });

  formularioProductoDanado: FormGroup = this.fb.group({
    seried: ['', [Validators.required, Validators.minLength(3)]],
    nombred: ['', [Validators.required, Validators.minLength(3)]],
    marcad: ['', [Validators.required, Validators.minLength(3)]],
    modelod: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(private ordeServicio: OrdenTrabajoService,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    if (this.ordeServicio.ProductoDanado == null) {
      return;
    }
    this.idOrdenTrabajo = this.ordeServicio.ProductoDanado.idOrdenTrabajo;

    this.formularioProducto.reset({
      serie: this.ordeServicio.ProductoDanado.numeroSerie || '',
      nombre: this.ordeServicio.ProductoDanado.nombreEquipo || '',
      marca: this.ordeServicio.ProductoDanado.marca || '',
      modelo: this.ordeServicio.ProductoDanado.modelo || '',
    });
  }


  cambioEquipo() {

    const { seried } = this.formularioProductoDanado.value;
    const cambio = {
      "idOrdenTrabajo": this.idOrdenTrabajo,
      "productoNuevo": this.idProductoCambio
    };
    this.ordeServicio.cambioEquipo(cambio).subscribe(data => {
      if (data.codigo == 1) {
        Swal.fire('Creacion Correcta', data.mesaje, 'success');
        this.router.navigate(['/orden/listar']);
      } else {
        Swal.fire('Error en la Creacion', data.mensaje, 'warning')
      }
    }
    )

  }




  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "800px";
    dialogConfig.height = "800px"
    this.dialog.open(ListarProductoComponent, dialogConfig).afterClosed()
      .subscribe(res => {
      if (res === undefined ) {
      return;
      };
      this.asignarValoresProducto(res);
    });
  }


  asignarValoresProducto(data: any) {
    this.idProductoCambio = data.numeroSerie;

    this.formularioProductoDanado.reset({
      seried: data.numeroSerie || '',
      nombred: data.producto.nombre || '',
      marcad: data.producto.marca || '',
      modelod: data.producto.modelo || '',
    });
  }

}

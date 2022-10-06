import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../service/producto.service';
import { Router } from '@angular/router';
// import { NumeroSerieProducto, Producto, Productos, Proveedor } from '../model/producto-Interface';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { NumeroSerieProducto, Producto, Productos, Proveedor } from '../../model/TODO';

@Component({
  selector: 'app-agregar-nueva-serie',
  templateUrl: './agregar-nueva-serie.component.html',
  styleUrls: ['./agregar-nueva-serie.component.css']
})
export class AgregarNuevaSerieComponent implements OnInit {

  agregarProducto: Proveedor[] = [];
  Producto: Producto;
  listaSeries: NumeroSerieProducto[] = [];
  cantidad: number = this.listaSeries.length;

  formularioProducto: FormGroup = this.fb.group({
    serie: ['', [Validators.minLength(3)]],
  });

  constructor(private productoservice: ProductoService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    
    if (this.productoservice.obtenerProducto == null) {
      this.router.navigateByUrl('/producto/');
    }
    else {
      this.Producto = this.productoservice.obtenerProducto;
    }
  }


  guardarSeries() {

    if (this.formularioProducto.invalid) {
      Swal.fire('Error, Campos Vacios', 'Por favor, Llene los Campos', 'error')
    } else {
      const prod: Productos = {
        "producto": {
          "idProducto": this.Producto.idProducto
        },
        "cantidad": this.cantidad,
        "numeroSerieProducto": this.listaSeries
      };

      this.productoservice.agregarNuevaSerieProducto(prod).subscribe(
        data => {
          if (data.codigo == 1) {
            Swal.fire('Creacion Correcta', data.mensaje, 'success');
            this.formularioProducto.reset();
            setTimeout(() => {
              this.router.navigate(['/producto/productos']);
            }, 300);
          } else {
            var splitted = data.mensaje.split("Error al agregar producto. java.lang.Exception: No se registro producto. java.lang.Exception:");
            Swal.fire('El Producto no fue Ingresado', splitted[1], 'warning')
          }
        });
    }
  }

  cancelar() {
    this.formularioProducto.reset();
    this.router.navigate(['/producto/productos']);
  }

  agregarCantidadProducto() {
    const serie = this.formularioProducto.get('serie').value;
    if (serie == null || serie == '') {
      return;
    } else {
      const serieNuevo: NumeroSerieProducto = {
        "numeroSerie": serie
      };
      this.cantidad = this.listaSeries.length;
      this.listaSeries.unshift(serieNuevo);
      this.formularioProducto.get('serie').reset();
      this.cantidad++;
    }
  }

  eliminarCantidadProducto(serieNuevo: NumeroSerieProducto) {
    for (let i = 0; i < this.listaSeries.length; i++) {
      if (serieNuevo == this.listaSeries[i]) {
        this.listaSeries.splice(i, 1);
        this.cantidad--;
      }
    }

  }


}

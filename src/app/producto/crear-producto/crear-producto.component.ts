import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
// import { Categoria, Productos, NumeroSerieProducto } from '../model/producto-Interface';
import { ProductoService } from '../service/producto.service';
import { nombreApellidoPattern, emailPattern } from '../../validator/Validaciones';
import { ProveedorService } from '../../proveedores/service/proveedor.service';
import { Router } from '@angular/router';
import { Categoria, NumeroSerieProducto, Productos, Proveedor } from '../../model/TODO';
// import { Proveedor } from '../../garantia/model/OrdenTrabajo';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  proveedor: Proveedor;
  listaProveedor: Proveedor[] = [];
  agregarProducto: Proveedor[] = [];
  listaSeries: NumeroSerieProducto[] = [];

  listaCategorias: Categoria[] = [{ "nombre": "TODOS" }];
  origen: String[] = ["Proveedor", "Bodega"];
  cantidad: number = this.listaSeries.length;

  formularioProducto: FormGroup = this.fb.group({
    serie: ['', [Validators.minLength(3)]],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    marca: ['', [Validators.required, Validators.minLength(3)]],
    modelo: ['', [Validators.required, Validators.minLength(3)]],
    origen: ['', [Validators.required, Validators.minLength(3)]],
    categoria: ['', [Validators.required, Validators.minLength(3)]],
  });

  formularioProveedor: FormGroup = this.fb.group({
    cedulap: ['', [Validators.required,]],
    nombresp: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern(nombreApellidoPattern)]],
    apellidosp: ['', []],
    telefonop: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15)]],
    direccionp: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    correop: ['', [Validators.required, Validators.pattern(emailPattern)]],
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private serviceProducto: ProductoService,
    private serviceProveedor: ProveedorService) { }

  ngOnInit(): void {
    this.serviceProducto.listaCategoria().subscribe(datos => {
      this.listaCategorias = datos;
    });
    this.listarProveedor();
  }

  crear() {

    if (this.formularioProducto.invalid) {
      Swal.fire('Error, Campos Vacios', 'Por favor, Llene los Campos', 'error')
    } else {
      const { nombre, marca, modelo, origen, categoria } = this.formularioProducto.value;
      const { cedula, nombres, apellidos, telefono, direccion, correo } = this.formularioProveedor.value;

      const prod: Productos = {
        "cantidad": this.cantidad,
        "producto": {
          "nombre": nombre,
          "marca": marca,
          "modelo": modelo,
          "origen": origen,
          "categoria": {
            "nombre": categoria
          },
          "proveedor": {
            "cedula": this.proveedor.cedula || cedula,
            "nombres": this.proveedor.nombres || nombres,
            "apellidos": this.proveedor.apellidos || apellidos,
            "telefono": this.proveedor.telefono || telefono,
            "direccion": this.proveedor.direccion || direccion,
            "correo": this.proveedor.correo || correo
          }
        },
        "numeroSerieProducto": this.listaSeries
      };

      this.serviceProducto.crearProducto(prod).subscribe(
        data => {

          if (data.codigo == 1) {
            Swal.fire('Creacion Correcta', data.mensaje, 'success');
            this.formularioProducto.reset();
            this.formularioProveedor.reset();
            setTimeout(() => {
              this.router.navigate(['/producto/productos']);
            }, 300);
          } else {
            Swal.fire('Error en la Creacion', 'El Producto no fue Ingresado', 'warning')
          }
        });
    }
  }

  cancelar() {
    this.formularioProducto.reset();
    this.formularioProveedor.reset();
    this.router.navigate(['/producto/productos']);
  }


  ValidarCamposProducto(campo: string) {
    return this.formularioProducto.controls[campo].errors
      && this.formularioProducto.controls[campo].touched;
  }

  ValidarCamposProveedor(campo: string) {
    return this.formularioProveedor.controls[campo].errors
      && this.formularioProveedor.controls[campo].touched;
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


  listarProveedor() {
    this.serviceProveedor.listarProveedor().subscribe(data => {
      this.listaProveedor = data;
    }, (err) => {
      console.log(err);
    });
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


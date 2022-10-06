import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../service/producto.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Productos } from '../../model/TODO';

@Component({
  selector: 'app-detalle-serie',
  templateUrl: './detalle-serie.component.html',
  styleUrls: ['./detalle-serie.component.css']
})
export class DetalleSerieComponent implements OnInit {

  idProducto:number;
  Producto:Productos;
  constructor(private productoservice: ProductoService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    if (this.productoservice.obtenerProducto == null) {
      this.router.navigateByUrl('/producto/');
    }
    else {
      this.idProducto = this.productoservice.obtenerProducto.idProducto;
      this.listarSeries( this.idProducto);
    }
  }

  listarSeries(id:number){
    this.productoservice.listaNumerosSeries(id).subscribe(
      data => {
        console.log(data);
        this.Producto=data;
      }
    );
  }

}

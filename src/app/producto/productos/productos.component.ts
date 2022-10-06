import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../service/producto.service';
import { Router } from '@angular/router';
import { Producto } from '../../model/TODO';
// import { Producto } from '../model/producto-Interface';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  listaproducto: any[] = [];
  constructor(private productoservice: ProductoService,private router:Router) { }

  ngOnInit(): void {
    this.productoservice.listarProductosStock().subscribe(
      data => {
        this.listaproducto=data;
      });
  }


  obtenerProducto(productos:Producto){
    this.productoservice.obtenerProducto=productos;
  }

  

}

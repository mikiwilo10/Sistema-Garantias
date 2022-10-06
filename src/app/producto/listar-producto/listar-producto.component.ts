import { Component, OnInit } from '@angular/core';
// import { Categoria, Producto } from '../model/producto-Interface';
import { ProductoService } from '../service/producto.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Categoria, Producto } from '../../model/TODO';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ListarProductoComponent implements OnInit {

  search: string = '';
  listaproducto: Producto[] = [];
  listaCategorias: Categoria[] = [{ "nombre": "TODOS" }];


  miFormulario: FormGroup = this.fb.group({
    categoria: ['', Validators.required],
  });

  tipoBusqueda = new FormControl('', [,]);


  constructor(private productoService: ProductoService,
    private fb: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<ListarProductoComponent>,
  ) { }

  ngOnInit(): void {
    this.listarProductos();
   this.listarCategorias();



   

    this.miFormulario.get('categoria')?.valueChanges
      .pipe(
        switchMap(cat => this.productoService.listarporCategoria(cat))
      )
      .subscribe(Categoriasproductos => {
        this.listaproducto = Categoriasproductos;
        // console.log(Categoriasproductos);
      });



  }



  agregarProducto(): void {
    this.dialogRef.close();
    this.router.navigate(['/producto/crear']);
  }
 
  cancelar(): void {
    this.dialogRef.close();
    // console.log('canelo');
    
  }



  obtenerOrden(orden: any) {
    this.dialogRef.close(orden);
    // console.log(orden);
    const { categoria } = this.miFormulario.value;
    // console.log(categoria);
  }

  listarProductos(){
    this.productoService.listarProductos().subscribe(data => {
      this.listaproducto = data;
    });
  }


  listarCategorias(){
    this.productoService.listaCategoria().subscribe(
      datos => {
      //console.log(datos);
      for (let item of datos) {
        this.listaCategorias.push(item);
      }
    });
  }

  filtrarBusquedaCategoria() {
    const estado = this.tipoBusqueda.value;
    // if (estado === 'TODOS') {
    //   // this.listaOrden();
    //   return this.OrdenTrabajos = lista;
    // } else {
      console.log(estado);
      
      this.search = estado;
    // }
  }

}

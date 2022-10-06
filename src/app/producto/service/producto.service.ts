import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Categoria, Producto, Productos, Proveedor } from '../model/producto-Interface';
import { environment } from '../../../environments/environment';
import { Categoria, Producto, Productos, Proveedor } from '../../model/TODO';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  obtenerProducto:Producto;

  constructor(private http:HttpClient) { }

  crearProducto(prod:Productos){
    const url=environment.ip + 'inventario/guardarProductoInventario'
   return this.http.post<any>(url,prod,{headers: 
    {'Content-Type': 'application/json; charset=UTF-8'}}
    );
  }

  listaCategoria(){
    const url=environment.ip+'inventario/listaCategoria';
    return this.http.get<Categoria[]>(url);
  }


  buscarProveedor(valor:String) {
      return this.http.get<Proveedor>(environment.ip + 'usuario/proveeedorcedula?cedula=' + valor);
  }

  listarProductos(){
    return this.http.get<Producto[]>(environment.ip+'inventario/listaProducto');
  }

  listarProductosStock(){
    return this.http.get<Producto[]>(environment.ip+'inventario/listaProductoStock');
  }


  listarporCategoria(cat:string){
    return this.http.get<Producto[]>(environment.ip+'inventario/listaProductoCategoria?categoria='+cat);
  }

  BuscarProductoSerie(numeroSerie:string){
    const url=environment.ip+'inventario/productoSerie?numeroSerie='+numeroSerie;   
    return  this.http.get<Producto>(url);
  }

  CambioProducto(cambio:any){
    const url=environment.ip+'inventario/guardarCambioProducto';
    return this.http.post<any>(url,cambio,{headers: {'Content-Type': 'application/json; charset=UTF-8'}});
  }

  agregarNuevaSerieProducto(nuevaserie:Productos){
    const url=environment.ip+'inventario/agregarProducto';
    return this.http.post<any>(url,nuevaserie,{headers: {'Content-Type': 'application/json; charset=UTF-8'}});
  }

  listaNumerosSeries(idProducto:number){
    const url=environment.ip+'inventario/buscarNserieProductoId?idProducto=';
    return this.http.get<Productos>(url+idProducto);

  }
}

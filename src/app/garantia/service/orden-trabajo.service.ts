import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Cliente, Detalle, EntregaProducto, HistorialEstado, Ordenes, OrdenTrabajo, ProductoDanado } from '../../model/TODO';

@Injectable({
  providedIn: 'root'
})
export class OrdenTrabajoService {

  orden: OrdenTrabajo = null;
  IDorden: number = null;
  ProductoDanado: ProductoDanado = null;

  constructor(private http: HttpClient) { }

  guardar(detalle: Detalle) {
    const urls = environment.ip + 'orden/guardarEstado';
    return this.http.post<any>(urls, detalle, { headers: { 'Content-Type': 'application/json; charset=UTF-8' } });
  }

  buscarProducto(serie: string) {
    const urls = environment.ip + 'inventario/productoSerie?numeroSerie=' + serie;
    return this.http.get<any>(urls);
  }

  cambioEquipo(cambioProducto: any) {
    const urls = environment.ip + 'inventario/guardarCambioOrden';

    return this.http.post<any>(urls, cambioProducto, {
      headers:
        { 'Content-Type': 'application/json; charset=UTF-8' }
    }
    );
  }

  listaEstadosHistoria() {
    const urls = environment.ip + 'orden/listaHistorialEstado';
    return this.http.get<HistorialEstado[]>(urls);
  }

  listarOrden() {
    const urls = environment.ip + 'orden/listaOrden';
    return this.http.get<OrdenTrabajo[]>(urls);
  }

  listarDetalles(id:number) {
    const urls = environment.ip + 'orden/listEstadoOrden?idordenTrabajo='+id;
    return this.http.get<Ordenes>(urls);
  }

 

  entregarProducto(cambio: EntregaProducto) {
    const urls = environment.ip + 'orden/actualizarEstadoEntregado';

    return this.http.post<any>(urls, cambio, {
      headers:
        { 'Content-Type': 'application/json; charset=UTF-8' }
    }
    );
  }


  actualizarOden(userPrueba: OrdenTrabajo){
    const urls =environment.ip + 'orden/actualizarOrden';
    
    return this.http.put<any>(urls,userPrueba, 
      { headers: { 'Content-Type': 'application/json; charset=UTF-8'}
  });
  }
}

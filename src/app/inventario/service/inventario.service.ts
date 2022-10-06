import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Inventario } from '../../model/TODO';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http:HttpClient) { }

  listarInventario(){
    const url=environment.ip+'inventario/listaInventario';
    return this.http.get<Inventario[]>(url);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Categoria } from '../../model/TODO';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http:HttpClient) { }


  crearCategoria(categoria:Categoria){
    const url=environment.ip+'inventario/guardarCategoria';
    return this.http.post<any>(url,categoria,{headers: 
      {'Content-Type': 'application/json; charset=UTF-8'}}
      );
  }

  listaCategoria(){
    const url=environment.ip+'inventario/listaCategoria';
    return this.http.get<Categoria[]>(url);
  }
}

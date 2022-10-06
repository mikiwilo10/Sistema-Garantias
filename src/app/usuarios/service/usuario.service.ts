import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Usuario } from '../../model/TODO';
// import { Usuario } from '../../garantia/model/OrdenTrabajo';
//import { ServidorConexion } from '../../../environments/conexion';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  user:Usuario=null;
  constructor(private http:HttpClient) { }

  actualizarUsuario(userActualizar:Usuario){
  return this.http.put<any>(environment.ip+'usuario/actualizarUsuario',userActualizar);
  }


}

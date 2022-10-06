import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Cliente } from '../../model/TODO';

@Injectable({
  providedIn: 'root'
})
export class ServicioClienteService {

  cliente:Cliente=null;

  constructor(private http:HttpClient) { }

  listarCliente(){
    return this.http.get<Cliente[]>(environment.ip+'usuario/listaCliente');
  }

  crearCliente(cliente:Cliente){
    return this.http.post<any>(environment.ip+'usuario/guardarCliente',cliente);
  }

  actualizarCliente(cliente:Cliente){
    return this.http.put<any>(environment.ip+'usuario/actualizarCliente',cliente);
  }

  // buscarCliente(cedula:string) {
  //   const urls = environment.ip + 'usuario/clienteCedula?cedula=' + cedula;
  //     this.http.get<Cliente>(urls);
  // }

  buscarCliente(cedula: string) {
    const urls = environment.ip + 'usuario/clienteCedula?cedula=' + cedula;
    return this.http.get<Cliente>(urls);
  }
}

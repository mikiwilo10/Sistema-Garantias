import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { ServidorConexion } from 'environments/conexion';
import { UsuarioService } from '../service/usuario.service';
import { environment } from '../../../environments/environment';
import { Usuario } from '../../model/TODO';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  UsuarioLista: Usuario[] = [];

  public buscar: string = '';
  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;

  constructor(private http: HttpClient,
    private userservice: UsuarioService) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }


  listarUsuarios() {
    this.http.get<Usuario[]>(environment.ip + 'usuario/listaUsuario').subscribe(
      data => {
        this.UsuarioLista = data;
      }
    );
  }




  ObetnerParametroPipe() {

    const valor = this.txtSearch.nativeElement.value;
    this.buscar = valor;
    if (valor.trim().length === 0) {
      return;
    }
    this.txtSearch.nativeElement.value = '';
  }

  obtenerOrden(user: Usuario) {
    this.userservice.user = user;
  }


}

















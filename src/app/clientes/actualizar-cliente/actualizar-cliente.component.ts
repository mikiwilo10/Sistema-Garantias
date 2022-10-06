import { Component, OnInit } from '@angular/core';
import { ServicioClienteService } from '../service/servicio-cliente.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Cliente } from '../../model/TODO';

@Component({
  selector: 'app-actualizar-cliente',
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css']
})
export class ActualizarClienteComponent implements OnInit {

  idCliente: number;
  cedula: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  direccion: string;
  correo: string;

  constructor(private clienteService: ServicioClienteService,
              private router:Router) { }

  ngOnInit(): void {

    if (this.clienteService.cliente != null) {
      this.idCliente = this.clienteService.cliente.idCliente;
      this.cedula = this.clienteService.cliente.cedula;
      this.nombres = this.clienteService.cliente.nombres;
      this.apellidos = this.clienteService.cliente.apellidos;
      this.telefono = this.clienteService.cliente.telefono;
      this.direccion = this.clienteService.cliente.direccion;
      this.correo = this.clienteService.cliente.correo;
    }

  }


  actualizarCliente() {
    if (this.idCliente == undefined) {
      Swal.fire('Error', 'miki error', 'error');
    } else {
      const client: Cliente = {

        idCliente:this.idCliente,
        cedula:this.cedula,
        nombres: this.nombres,
        apellidos: this.apellidos,
        telefono: this.telefono,
        direccion: this.direccion,
        correo: this.correo
      }

      this.clienteService.actualizarCliente(client).subscribe(
        data =>{
          if (data.codigo == 1) {
            Swal.fire('Actualizacion Completa', data.mensaje, 'success')
              .then(result => {
                if (result.value) {
                  this.router.navigate(['/cliente/listar']);
                }
              });

          } else {
            Swal.fire('Error', data.mensaje, 'error');
          }
        });
    } 
  }



}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2';

import { OrdenTrabajoService } from '../service/orden-trabajo.service';
import { OrdenTrabajo } from '../../model/TODO';

@Component({
  selector: 'app-actualizar-orden',
  templateUrl: './actualizar-orden.component.html',
  styleUrls: ['./actualizar-orden.component.css']
})
export class ActualizarOrdenComponent implements OnInit {
  lugargarantia: string;
  ordenDetalle: OrdenTrabajo = null;
  fechas: Date = new Date();
  estadomiki: string = '';

  idOrdenTrabajo?: number;
  numeroOrden?: string;
  nombreEquipo?: string;
  numeroSerie?: string;
  marca?: string;
  modelo?: string;
  observacionesEquipo?: string;

  numeroFactura: string;
  fecha: Date;
  montoFactura: number;
  fechaFactura: Date;

  aniosGarantia: number = 1;

  idCliente: number;
  cedula?: string;
  nombres?: string;
  apellidos?: string;
  telefono?: string;
  direccion?: string;
  correo?: string;

  id: number;
  pcedula?: string;
  pnombres?: string;
  papellidos?: string;
  ptelefono?: string;
  pdireccion?: string;
  pcorreo?: string;

  constructor(private router: Router,
    private ordeServicio: OrdenTrabajoService,
    private http: HttpClient) { }

  ngOnInit(): void {
    //if (this.ordeServicio.orden !== null || this.ordeServicio.orden !== undefined || this.ordeServicio.orden.cliente !== undefined) {
    if (this.ordeServicio.orden != null) {
      this.ordenDetalle = this.ordeServicio.orden;

      this.idOrdenTrabajo = this.ordenDetalle.idOrdenTrabajo;
      this.nombreEquipo = this.ordenDetalle.nombreEquipo;
      this.numeroOrden = this.ordenDetalle.numeroOrden;
      this.nombreEquipo = this.ordenDetalle.nombreEquipo;
      this.numeroSerie = this.ordenDetalle.numeroSerie;
      this.marca = this.ordenDetalle.marca;
      this.modelo = this.ordenDetalle.modelo;
      this.observacionesEquipo = this.ordenDetalle.observacionesEquipo;

      this.numeroFactura = this.ordenDetalle.numeroFactura;;
      this.fecha = this.ordenDetalle.fecha;
      this.montoFactura = this.ordenDetalle.montoFactura;
      this.fechaFactura = this.ordenDetalle.fechaFactura;
      this.lugargarantia=this.ordenDetalle.tipoGarantia;

      this.aniosGarantia = this.ordenDetalle.aniosGarantia;

      this.idCliente = this.ordenDetalle.cliente.idCliente;
      this.cedula = this.ordenDetalle.cliente.cedula;
      this.nombres = this.ordenDetalle.cliente.nombres;
      this.apellidos = this.ordenDetalle.cliente.apellidos;
      this.telefono = this.ordenDetalle.cliente.telefono;
      this.direccion = this.ordenDetalle.cliente.direccion;
      this.correo = this.ordenDetalle.cliente.correo;

      this.id = this.ordenDetalle.proveedor.id;
      this.pcedula = this.ordenDetalle.proveedor.cedula;
      this.pnombres = this.ordenDetalle.proveedor.nombres;
      this.papellidos = this.ordenDetalle.proveedor.apellidos;
      this.ptelefono = this.ordenDetalle.proveedor.telefono;
      this.pdireccion = this.ordenDetalle.proveedor.direccion;
      this.pcorreo = this.ordenDetalle.proveedor.correo;
    } else {
      console.log(this.ordenDetalle);
    }


  }



  ActualizarOrdenTrabajo() {

    if (this.idOrdenTrabajo == undefined) {
      Swal.fire('Error', 'Sin Valores', 'error');
    } else {

      const userPrueba: OrdenTrabajo =
      {
        "idOrdenTrabajo": this.idOrdenTrabajo,
        "numeroOrden": this.numeroOrden,
        "nombreEquipo": this.nombreEquipo,
        "numeroSerie": this.numeroSerie,
        "marca": this.marca,
        "modelo": this.modelo,
        "observacionesEquipo": this.observacionesEquipo,

        "fecha": this.fechas,
        "aniosGarantia": this.aniosGarantia,
        "numeroFactura": this.numeroFactura,
        "fechaFactura": this.fechas,
        "montoFactura": this.montoFactura,
        "estado": "Proceso finalizado",
        "usuario": {
          "idUsuario": this.ordenDetalle.usuario.idUsuario
        },
        "cliente": {
          'idCliente': this.idCliente,
          "cedula": this.cedula,
          "nombres": this.nombres,
          "apellidos": this.apellidos,
          "telefono": this.telefono,
          "direccion": this.direccion,
          "correo": this.correo
        },
        "proveedor": {
          "id": this.id,
          "cedula": this.pcedula,
          "nombres": this.pnombres,
          "apellidos": this.papellidos,
          "telefono": this.ptelefono,
          "direccion": this.pdireccion,
          "correo": this.pcorreo
        }

      };


      // this.http.put<any>(environment.ip + 'orden/actualizarOrden',
      //   userPrueba, {
      //   headers: {
      //     'Content-Type': 'application/json; charset=UTF-8'
      //   }
      // })
      this.ordeServicio.actualizarOden(userPrueba)
      .subscribe(
        data => {
          console.log(data);
          if (data.codigo == 1) {
            Swal.fire('Actualizacion Completa', data.mensaje, 'success')
              .then(result => {
                if (result.value) {
                  this.router.navigate(['/orden/listar']);
                }
              });

          } else {
            Swal.fire('Error', data.mensaje, 'error');
          }

        }

      );

    }
  }


  cancelar() {
    this.router.navigate(['/orden/listar']);
  }
  


}

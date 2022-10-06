import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OrdenTrabajoService } from '../service/orden-trabajo.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { ImprimirOrdenComponent } from '../../inicio/imprimir-orden/imprimir-orden.component';
import { OrdenTrabajo } from '../../model/TODO';


@Component({
  selector: 'app-list-trabajo',
  templateUrl: './list-trabajo.component.html',
  styleUrls: ['./list-trabajo.component.css']
})
export class ListTrabajoComponent implements OnInit {

  OrdenTrabajos: OrdenTrabajo[] = [];
  public search: string = '';

  @ViewChild(ImprimirOrdenComponent) hijo: ImprimirOrdenComponent;


  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;
  LugarGarantgia: string[] = ['TODOS','Garantia negado', 'Cambio Producto', 'Finalizo','En proceso'];
  tipoGarantgia: string[] = ['TODOS','Cliente', 'Proveedor'];

  constructor(
    private ordeServicio: OrdenTrabajoService,
    private fb: FormBuilder) { }

  estadoBusqueda = new FormControl('', [,]);
  tipoBusqueda = new FormControl('', [,]);

  ngOnInit() {
    this.listaOrden();
  }


  ObetnerParametroPipe() {
    const valor = this.txtSearch.nativeElement.value;
    this.search = valor;
    if (valor.trim().length === 0) {
      return;
    }
    this.txtSearch.nativeElement.value = '';
  }

  obtenerOrden(orden: OrdenTrabajo) {
    this.ordeServicio.orden = orden;
    this.ordeServicio.IDorden = orden.idOrdenTrabajo;
  }

  filtrarBusqueda() {
    const estado = this.estadoBusqueda.value;
    // if (estado === 'TODOS') {
    //   // this.listaOrden();
    //   return this.OrdenTrabajos = lista;
    // } else {
      this.search = estado;
    // }
  }



  filtrarBusquedaTipo() {
    const estado = this.tipoBusqueda.value;
    this.search = estado;
  }



  listaOrden() {
    this.ordeServicio.listarOrden().
      subscribe(
        data => {
          this.OrdenTrabajos = data;
        });
  }

  ImprimirOrden(){
    this.hijo.imprimirDetalle();
  }

}

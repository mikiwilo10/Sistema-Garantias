import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Cliente } from '../../model/TODO';
import { ServicioClienteService } from '../service/servicio-cliente.service';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent implements OnInit {

  
  Clientes:Cliente[]=[]

  public buscar: string = '';
  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;


  constructor(private clienteService:ServicioClienteService) { }

  ngOnInit(): void {
    this.listarClientes();
  }

  listarClientes(){
    this.clienteService.listarCliente().subscribe(
      datos => {
       if (datos) {
         this.Clientes=datos;
       }
      }
    );
  }

  obtenerCliente(cliente:Cliente){
    this.clienteService.cliente=cliente;
  }

  ObetnerParametroPipe() {

    const valor = this.txtSearch.nativeElement.value;
    this.buscar = valor;
    if (valor.trim().length === 0) {
      return;
    }
    this.txtSearch.nativeElement.value = '';
  }

}

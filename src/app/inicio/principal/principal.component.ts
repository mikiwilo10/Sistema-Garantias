import { Component, Input, OnInit } from '@angular/core';
import * as printJS from 'print-js';
import { Cliente, Detalle } from '../../model/TODO';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  @Input()detallesRecibos: Detalle[]=[];
  @Input()Cliente: Cliente;

  constructor() { }
  


  ngOnInit(): void {

  }

 public imprimirDetalle() {
   console.log(this.Cliente);
   
    printJS({ 
    printable: 'tabla-miki', 
    type: 'html', 
    style: 'table, td, th { border: 1px solid black; } table { width: 100%; border-collapse: collapse;}  h1 {  text-align: center!important;}',   
  });
  }



}

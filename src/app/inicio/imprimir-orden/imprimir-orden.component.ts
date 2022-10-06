import { Component, Input, OnInit } from '@angular/core';
import * as printJS from 'print-js';
import { OrdenTrabajo } from '../../model/TODO';

@Component({
  selector: 'app-imprimir-orden',
  templateUrl: './imprimir-orden.component.html',
  styleUrls: ['./imprimir-orden.component.css']
})
export class ImprimirOrdenComponent implements OnInit {
 
  @Input()cliente: OrdenTrabajo={};
  pdf:any;
  constructor() { }

  ngOnInit(): void {

  }

  public imprimirDetalle() {
    const pdf= printJS({
      printable: 'tabla-miki',
      type: 'html',
      base64: true,
      style: `
      .input { 
          background-color:transparent;
          padding: .5rem;
          margin: .5rem 0;
          border: none;
          transition: all .5s;
          font-size: 15px;
        }
      h1 { 
        text-align: center!important;
        }
      label{
          font-size: 12px;
      }`,
    });
    
  }


  handleUpload() {
    
    // const file = event.target.files[0];
    const file = this.pdf;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // console.log(reader.result);
    };
  }


  

}

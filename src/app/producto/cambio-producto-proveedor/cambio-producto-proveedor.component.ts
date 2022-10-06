import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../service/producto.service';
import { HttpClient } from '@angular/common/http';
// import { Producto } from '../model/producto-Interface';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ListarProductoComponent } from '../listar-producto/listar-producto.component';

@Component({
  selector: 'app-cambio-producto-proveedor',
  templateUrl: './cambio-producto-proveedor.component.html',
  styleUrls: ['./cambio-producto-proveedor.component.css']
})
export class CambioProductoProveedorComponent implements OnInit {

  constructor(
    private fb: FormBuilder, 
    private serviceProducto: ProductoService, 
    private http: HttpClient,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  idProductoCambio:number;
  idProductoCambioDanado:number;

  formularioProducto: FormGroup = this.fb.group({
    serie: ['', [Validators.required, Validators.minLength(3)]],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    marca: ['', [Validators.required, Validators.minLength(2)]],
    modelo: ['', [Validators.required, Validators.minLength(3)]],
  });

  formularioProductoDanado: FormGroup = this.fb.group({
    seried: ['', [Validators.required, Validators.minLength(3)]],
    nombred: ['', [Validators.required, Validators.minLength(2)]],
    marcad: ['', [Validators.required, Validators.minLength(2)]],
    modelod: ['', [Validators.required, Validators.minLength(3)]],
  });


  buscarProducto() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "800px";
    dialogConfig.height = "800px"
    //dialogConfig.data = { orderItemIndex, OrderID };
    this.dialog.open(ListarProductoComponent, dialogConfig).afterClosed().subscribe(res => {
      //  this.updateGrandTotal();
      console.log(res);
      this.asignarValoresProducto(res);
    });
  }

  asignarValoresProducto(data: any) {
   // this.idProductoCambio = data.numeroSerie;

    this.formularioProducto.reset({
      serie: data.numeroSerie || '',
      nombre: data.producto.nombre || '',
      marca: data.producto.marca || '',
      modelo: data.producto.modelo || '',
    });
  }

  // buscarProducto() {
  //   const { serie } = this.formularioProducto.value;
  //   //const a = '00A82';
  //   this.serviceProducto.BuscarProductoSerie(serie)
  //     .subscribe(
  //       resp => {
  //         console.log(resp);
  //         this.formularioProducto.reset({
  //           serie: resp.numeroSerie || '',
  //           nombre: resp.nombre || '',
  //           marca: resp.marca || '',
  //           modelo: resp.modelo || '',
  //         });
  //       });
  // //  console.log('miki');
  // }

  buscarProductoDanado() {
  
    // const { seried } = this.formularioProductoDanado.value;
    // this.serviceProducto.BuscarProductoSerie(seried)
    //   .subscribe(
    //     resp => {
    //       console.log(resp);
    //       // if (resp ) {
            
    //       // } else {
            
    //       // }
    //       this.formularioProductoDanado.reset({
    //         seried: resp.numeroSerie || '',
    //         nombred: resp.nombre || '',
    //         marcad: resp.marca || '',
    //         modelod: resp.modelo || '',
    //       });
    //     });
    // console.log('miki');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "800px";
    dialogConfig.height = "800px"
    //dialogConfig.data = { orderItemIndex, OrderID };
    this.dialog.open(ListarProductoComponent, dialogConfig).afterClosed().subscribe(res => {
      //  this.updateGrandTotal();
      console.log(res);
      this.asignarValoresProductoDanado(res);
    });
    
  }
  asignarValoresProductoDanado(data: any) {
   //  this.idProductoCambioDanado = data.numeroSerie;
 
     this.formularioProductoDanado.reset({
       seried: data.numeroSerie || '',
       nombred: data.producto.nombre || '',
       marcad: data.producto.marca || '',
       modelod: data.producto.modelo || '',
     });
   }

  cambiarProducto() {
    const { serie } = this.formularioProducto.value;
    const { seried } = this.formularioProductoDanado.value;


    const cambio = {
      "productoAcambiar": serie,
      "productoNuevo": seried
    };

    this.serviceProducto.CambioProducto(cambio).subscribe(
      data => {
        if (data.codigo == 1) {

          Swal.fire('Creacion Correcta', data.mesaje, 'success');
          this.formularioProducto.reset();
          this.formularioProductoDanado.reset();
        } else {
          Swal.fire('Error en la Creacion', data.mensaje, 'warning')
        }
      });
    

  }


}

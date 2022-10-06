import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarProductoComponent } from './listar-producto.component';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FiltroProductoPipe } from '../pipe/filtro-producto.pipe';



@NgModule({
  declarations: [
    ListarProductoComponent,
     FiltroProductoPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,RouterModule
  ],
  exports:[
    ListarProductoComponent
  ]
})
export class ListaProductoModule { }

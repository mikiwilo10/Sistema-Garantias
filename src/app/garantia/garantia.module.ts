import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressBarModule} from '@angular/material/progress-bar';


import { GarantiaRoutingModule } from './garantia-routing.module';
import { ListTrabajoComponent } from './list-trabajo/list-trabajo.component';

import { CrearOrdenComponent } from './crear-orden/crear-orden.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { DetalleOrdenComponent } from './detalle-orden/detalle-orden.component';
import { ActualizarOrdenComponent } from './actualizar-orden/actualizar-orden.component';
import { FiltroOrdenPipe } from './filtroPipe/filtro-orden.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { NuevoDetalleComponent } from './vista/nuevo-detalle/nuevo-detalle.component';
import { MatIconModule } from '@angular/material/icon';
import { CambioProductoComponent } from './cambio-producto/cambio-producto.component';

import { FormsModule } from '@angular/forms';
import { ListaProductoModule } from '../producto/listar-producto/lista-producto.module';
import { InicioModule } from '../inicio/inicio.module';
import { EntregaProductoComponent } from './vista/entrega-producto/entrega-producto.component';


@NgModule({
  declarations: [

    ListTrabajoComponent,
    CrearOrdenComponent,
    DetalleOrdenComponent,
    ActualizarOrdenComponent,
    FiltroOrdenPipe,
    DetalleOrdenComponent, 
    NuevoDetalleComponent,  
    CambioProductoComponent, 
    EntregaProductoComponent],
  imports: [
    CommonModule,
    GarantiaRoutingModule,
    RouterModule,
    FormsModule,
    ListaProductoModule,
    InicioModule,
 
    //modulos para los formularios reactivos
    MaterialModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,

    
  ],
  exports: [

  ]
})
export class GarantiaModule { }

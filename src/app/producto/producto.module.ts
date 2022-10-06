import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { ListarProductoComponent } from './listar-producto/listar-producto.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CambioProductoProveedorComponent } from './cambio-producto-proveedor/cambio-producto-proveedor.component';
import { ListaProductoModule } from './listar-producto/lista-producto.module';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProductosComponent } from './productos/productos.component';
import { FiltroProductoPipe } from './pipe/filtro-producto.pipe';
import { AgregarNuevaSerieComponent } from './agregar-nueva-serie/agregar-nueva-serie.component';
import { DetalleSerieComponent } from './detalle-serie/detalle-serie.component';


@NgModule({
  declarations: [
    CrearProductoComponent,
    CambioProductoProveedorComponent,
    ProductosComponent,
    AgregarNuevaSerieComponent,
    DetalleSerieComponent,
    // FiltroProductoPipe
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    ReactiveFormsModule,
    ListaProductoModule,
    FormsModule,

    MaterialModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  
})
export class ProductoModule { }

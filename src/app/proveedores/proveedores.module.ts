import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoProveedorComponent } from './nuevo-proveedor/nuevo-proveedor.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { FiltradoPipe } from './filtradoProveedor/filtrado.pipe';
import { MaterialModule } from '../material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { ProveedorRoutingModule } from './proveedor-routing.module';
import { ActualizarProveedorComponent } from './actualizar-proveedor/actualizar-proveedor.component';



@NgModule({
  declarations: [NuevoProveedorComponent,ProveedorComponent,FiltradoPipe, ActualizarProveedorComponent],
  imports: [
    CommonModule,
    MaterialModule,
    LayoutModule,
    RouterModule,
    ProveedorRoutingModule
  ]
})
export class ProveedoresModule { }

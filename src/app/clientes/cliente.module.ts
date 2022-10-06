import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { NuevoClienteComponent } from './nuevo-cliente/nuevo-cliente.component';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ListaClienteComponent } from './lista-cliente/lista-cliente.component';
import { ActualizarClienteComponent } from './actualizar-cliente/actualizar-cliente.component';
import { FiltroClientePipe } from './pipe/filtro-cliente.pipe';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [NuevoClienteComponent, ListaClienteComponent, ActualizarClienteComponent, FiltroClientePipe],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    MaterialModule,
    RouterModule
  ]
})
export class ClienteModule { }

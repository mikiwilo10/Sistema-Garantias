import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventarioRoutingModule } from './inventario-routing.module';
import { ListaInventarioComponent } from './lista-inventario/lista-inventario.component';


@NgModule({
  declarations: [
    ListaInventarioComponent
  ],
  imports: [
    CommonModule,
    InventarioRoutingModule
  ]
})
export class InventarioModule { }

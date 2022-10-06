import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { ListaCategoriaComponent } from './lista-categoria/lista-categoria.component';
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    ListaCategoriaComponent,
    CrearCategoriaComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    MaterialModule
  ]
})
export class CategoriaModule { }

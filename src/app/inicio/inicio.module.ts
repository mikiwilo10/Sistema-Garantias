import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { PrincipalComponent } from './principal/principal.component';
import { ImprimirOrdenComponent } from './imprimir-orden/imprimir-orden.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { PruebaComponent } from './prueba/prueba.component';


@NgModule({
  declarations: [
    PrincipalComponent,
    ImprimirOrdenComponent,
    PruebaComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    MaterialModule,
    FormsModule
  ],
  exports:[
    PrincipalComponent,
    ImprimirOrdenComponent,
  ]
})
export class InicioModule { }

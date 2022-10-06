import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';

import { UsuarioComponent } from './usuario/usuario.component';
import { ListarComponent } from './listar/listar.component';
import { EditarUsuariosComponent } from './editar-usuarios/editar-usuarios.component';


import { FiltroUsuariosPipe } from './filtrosUsuarios/filtro-usuarios.pipe';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { MaterialModule } from '../material/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    UsuarioComponent,
    ListarComponent,
    EditarUsuariosComponent,
    FiltroUsuariosPipe],
  imports: [
  CommonModule,
  RouterModule,
  MaterialModule,
  MatCardModule,
  MatDialogModule,
  UsuarioRoutingModule
  ]
})
export class UsuariosModule { }

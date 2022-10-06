import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditarUsuariosComponent } from './editar-usuarios/editar-usuarios.component';
import { ListarComponent } from './listar/listar.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ValidarTokenGuard } from '../auth/guards/validar-token.guard';



const routes: Routes = [

  {
    path: '',
    children: [
      { path: 'listar', component: ListarComponent },
      { path: 'crear', component: UsuarioComponent },
      { path: 'actualizar', component: EditarUsuariosComponent },
      { path: '**', redirectTo: 'listar' },
    ],
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
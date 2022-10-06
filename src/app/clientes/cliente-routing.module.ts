import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from '../auth/guards/validar-token.guard';
import { ListaClienteComponent } from './lista-cliente/lista-cliente.component';
import { NuevoClienteComponent } from './nuevo-cliente/nuevo-cliente.component';
import { ActualizarClienteComponent } from './actualizar-cliente/actualizar-cliente.component';

const routes: Routes = [
  {
    path: '',
    children: [
        { path: 'listar', component: ListaClienteComponent },
        { path: 'nuevo', component: NuevoClienteComponent },
        { path: 'actualizar', component: ActualizarClienteComponent },
        { path: '**', redirectTo: 'listar' }
    ],
     canActivate:[ValidarTokenGuard],
     canLoad:[ValidarTokenGuard]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }

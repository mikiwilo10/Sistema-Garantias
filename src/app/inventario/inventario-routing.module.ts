import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from '../auth/guards/validar-token.guard';
import { ListaInventarioComponent } from './lista-inventario/lista-inventario.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path: 'inventario', component:ListaInventarioComponent},
      { path: '', redirectTo: 'inventario' },
    ],
    canActivate:[ValidarTokenGuard],
    canLoad:[ValidarTokenGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }

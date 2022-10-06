import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaCategoriaComponent } from './lista-categoria/lista-categoria.component';
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';
import { ValidarTokenGuard } from '../auth/guards/validar-token.guard';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path: 'crear',
        component:CrearCategoriaComponent
      },
      {
        path: 'listar',
        component:ListaCategoriaComponent
      },
      { path: '**', redirectTo: 'crear' },
    ],
    canActivate:[ValidarTokenGuard],
    canLoad:[ValidarTokenGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from '../auth/guards/validar-token.guard';
import { PrincipalComponent } from './principal/principal.component';
import { ImprimirOrdenComponent } from './imprimir-orden/imprimir-orden.component';
import { PruebaComponent } from './prueba/prueba.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path: 'principal', component:PruebaComponent},
      { path: '', redirectTo: 'principal' },
    ],
    canActivate:[ValidarTokenGuard],
    canLoad:[ValidarTokenGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { OrdenTrabajoComponent } from './orden-trabajo/orden-trabajo.component';
import { ListTrabajoComponent } from './list-trabajo/list-trabajo.component';
import { ActualizarOrdenComponent } from './actualizar-orden/actualizar-orden.component';
import { DetalleOrdenComponent } from './detalle-orden/detalle-orden.component';
import { CrearOrdenComponent } from './crear-orden/crear-orden.component';
import { ValidarTokenGuard } from '../auth/guards/validar-token.guard';
import { CambioProductoComponent } from './cambio-producto/cambio-producto.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listar', component: ListTrabajoComponent },
      { path: 'crear', component: CrearOrdenComponent },
      { path: 'actualizar', component: ActualizarOrdenComponent },
      { path: 'detalle', component: DetalleOrdenComponent },
      { path: 'cambioProducto', component: CambioProductoComponent },
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
export class GarantiaRoutingModule { }

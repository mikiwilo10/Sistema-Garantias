import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProductoComponent } from './listar-producto/listar-producto.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { CambioProductoProveedorComponent } from './cambio-producto-proveedor/cambio-producto-proveedor.component';
import { ValidarTokenGuard } from '../auth/guards/validar-token.guard';
import { ProductosComponent } from './productos/productos.component';
import { AgregarNuevaSerieComponent } from './agregar-nueva-serie/agregar-nueva-serie.component';
import { DetalleSerieComponent } from './detalle-serie/detalle-serie.component';

const routes: Routes = [
  {
    path:'',
    children: [
      { path: 'listar', component: ListarProductoComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'crear', component: CrearProductoComponent },
      { path: 'cambioproveedor', component: CambioProductoProveedorComponent },
      { path: 'nuevaserie', component: AgregarNuevaSerieComponent },
      { path: 'detalleProductos', component: DetalleSerieComponent },
      { path: '**', redirectTo: 'productos' },
    ],
    canActivate:[ValidarTokenGuard],
    canLoad:[ValidarTokenGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }

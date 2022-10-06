import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  // {
  //   path: 'producto',
  //   loadChildren: () => import('../../producto/producto.module').then(m => m.ProductoModule)
  // },
  // {
  //   path: 'usuario',
  //   loadChildren: () => import('../../usuarios/usuarios.module').then(m => m.UsuariosModule)
  // },
  // {
  //   path: 'proveedor',
  //   loadChildren: () => import('../../proveedores/proveedores.module').then(m => m.ProveedoresModule)
  // },
  // {
  //   path: 'cliente',
  //   loadChildren: () => import('../../clientes/cliente.module').then(cl => cl.ClienteModule) 
  // },
  // {
  //   path: 'orden',
  //   loadChildren: () => import('../../garantia/garantia.module').then(m => m.GarantiaModule)
  // },
  // {
  //   path: 'inicio',
  //   loadChildren: () => import('../../inicio/inicio.module').then(m => m.InicioModule)
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }


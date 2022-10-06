import { NgModule } from '@angular/core';
//import { CommonModule, } from '@angular/common';
//import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
//import { LoginComponent } from './login/login.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { ValidarTokenGuard } from './auth/guards/validar-token.guard';
import { CategoriaModule } from './categoria/categoria.module';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'auth',
  //   pathMatch: 'full',
  // }, 
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),

  },
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) ,
  // },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'producto',
        loadChildren: () => import('./producto/producto.module').then(m => m.ProductoModule)
      },
      {
        path: 'usuario',
        loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
      },
      {
        path: 'proveedor',
        loadChildren: () => import('./proveedores/proveedores.module').then(m => m.ProveedoresModule)
      },
      {
        path: 'cliente',
        loadChildren: () => import('./clientes/cliente.module').then(cl => cl.ClienteModule)
      },
      {
        path: 'orden',
        loadChildren: () => import('./garantia/garantia.module').then(m => m.GarantiaModule)
      },
      {
        path: 'inicio',
        loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule)
      },
      {
        path: 'inventario',
        loadChildren: () => import('./inventario/inventario.module').then(m => m.InventarioModule)
      },
      {
        path: 'categoria',
        loadChildren: () => import('./categoria/categoria.module').then(m => m.CategoriaModule)
      },
      {
        path: '',
        redirectTo: 'inicio'
      },
    
    ]
    //loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    // canActivate: [ValidarTokenGuard],
    //canLoad: [ValidarTokenGuard]
  },
  /* {
     path: 'producto',
     loadChildren: () => import('./producto/producto.module').then(m => m.ProductoModule)
   },
   {
     path: 'usuario',
     loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
   },
   {
     path: 'proveedor',
     loadChildren: () => import('./proveedores/proveedores.module').then(m => m.ProveedoresModule)
   },
   {
     path: 'cliente',
     loadChildren: () => import('./clientes/cliente.module').then(cl => cl.ClienteModule) 
   },
   {
     path: 'orden',
     loadChildren: () => import('./garantia/garantia.module').then(m => m.GarantiaModule)
   },
   {
     path: 'inicio',
     loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule)
   },
   */

  // {
  //   path: '',
  //   component: AdminLayoutComponent,
  //   children: [{
  //     path: '',
  //     loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  //   }],
  //   canActivate: [ValidarTokenGuard],
  //   canLoad: [ValidarTokenGuard]
  // },

  {
    path: '**',
    redirectTo: 'inicio'
  },
  

];

@NgModule({
  imports: [
    //  CommonModule,
    // BrowserModule,
    RouterModule.forRoot(routes)
    // { relativeLinkResolution: 'legacy' }
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }

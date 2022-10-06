import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NuevoProveedorComponent } from './nuevo-proveedor/nuevo-proveedor.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { ActualizarProveedorComponent } from './actualizar-proveedor/actualizar-proveedor.component';
import { ValidarTokenGuard } from '../auth/guards/validar-token.guard';


const routes: Routes = [

    {
        path: '',
        children: [
            { path: 'proveedores', component: ProveedorComponent },
            { path: 'nuevoProveedor', component: NuevoProveedorComponent },
            { path: 'actualizar', component: ActualizarProveedorComponent },
            { path: '**', redirectTo: 'proveedores' },
        ],
        canActivate: [ValidarTokenGuard],
        canLoad: [ValidarTokenGuard]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProveedorRoutingModule { }
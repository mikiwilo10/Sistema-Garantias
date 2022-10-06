import { Pipe, PipeTransform } from '@angular/core';
import { Proveedor } from '../../model/TODO';

@Pipe({
  name: 'filtrado'
})
export class FiltradoPipe implements PipeTransform {

  Proveedores: Proveedor[] = [];

  transform(listaProveedor: Proveedor[], buscar: string): Proveedor[] {
    if (buscar.length === 0) {
      return listaProveedor;
    }


    const filteredUsuario = listaProveedor.filter(proveedor => proveedor.cedula.trim().toLowerCase().includes(buscar.trim().toLocaleLowerCase()));
    return filteredUsuario;
    // for (const prov of lista1) {

    //   if (prov.cedula == search) {
    //     this.Proveedores.push(prov);
    //   }

    // }

    // return this.Proveedores;
  }
}

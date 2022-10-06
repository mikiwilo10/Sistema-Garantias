import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../../model/TODO';

@Pipe({
  name: 'filtroUsuarios'
})
export class FiltroUsuariosPipe implements PipeTransform {

  ListaUsuario: Usuario[] = [];

  transform(ArregloUsuario: Usuario[], buscar: string = ''): Usuario[] {
    if (buscar.length === 0) {
      return ArregloUsuario;
    }

    const filteredUsuario = ArregloUsuario.filter(usuario => usuario.cedula.trim().toLowerCase().includes(buscar.trim().toLocaleLowerCase()));
    return filteredUsuario;
    
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from '../../model/TODO';

@Pipe({
  name: 'filtroCliente'
})
export class FiltroClientePipe implements PipeTransform {

  transform(clientes: Cliente[], buscar: string = ''): Cliente[] {
    if (buscar.length === 0) {
      return clientes;
    }

    const filteredUsuario = clientes.filter(clientes => clientes.cedula.trim().toLowerCase().includes(buscar.trim().toLocaleLowerCase()));
    return filteredUsuario;
    
  
  }

}

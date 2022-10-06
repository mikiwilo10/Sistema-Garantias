import { Pipe, PipeTransform } from '@angular/core';
import { OrdenTrabajo } from '../../model/TODO';

@Pipe({
  name: 'filtroOrden'
})
export class FiltroOrdenPipe implements PipeTransform {

  transform(ordenes: OrdenTrabajo[], search: string = ''): OrdenTrabajo[] {

    if (search.length === 0 || search === 'TODOS') {
      return ordenes;
    }

    const filteredOrdenes = ordenes.filter( orden => orden.nombreEquipo.trim().toLowerCase().includes( search.trim().toLocaleLowerCase())
                                            || orden.numeroSerie.trim().toLowerCase().includes( search.trim().toLocaleLowerCase())
                                            || orden.cliente.nombres.trim().toLowerCase().includes( search.trim().toLocaleLowerCase())
                                            || orden.cliente.cedula.trim().includes( search.trim().toLocaleLowerCase())
                                            || orden.numeroOrden.trim().includes( search.trim().toLocaleLowerCase())
                                            || orden.estado.trim().includes( search.trim())
                                            || orden.tipoGarantia.trim().includes( search.trim())
                                            );
    return filteredOrdenes;

  }

}

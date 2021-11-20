import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../interfaces/user/user';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: User[], args: string): User[] | null {
    // Si no existe un listado de amigos regresamos null
    if (!value.length) {
      return null;
    }

    // Si no hay amigos que buscar en el listado, regresamos el listado completo de amigos
    if (!args) {
      return value;
    }

    // Convertimos todo a minisculas, y filtramos el arreglo con aquellos amigos que incluyan el término de busqueda
    // El JSON se convierte a string para buscar en todos sus paths
    args = args.toLowerCase();
    return value.filter((user: User) => {
      return JSON.stringify(user).toLowerCase().includes(args);
    })
  }

}

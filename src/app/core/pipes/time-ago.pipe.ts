import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns'; // Se usa la librería date-fns para hacer los cálculos.
import { es } from 'date-fns/locale'; // Importa el locale en inglés

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: any): string {
    if (!value) return '';
    const date = new Date(value);
    return formatDistanceToNow(date, { addSuffix: true, locale: es});
  }

}

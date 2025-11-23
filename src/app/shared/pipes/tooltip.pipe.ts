import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tooltip',
  standalone: true
})
export class TooltipPipe implements PipeTransform {
  /**
   * Trunca una cadena y añade una elipsis (…)
   * @param value texto original
   * @param length longitud máxima (por defecto 20)
   */
  transform(value: string | null | undefined, length = 20): string {
    if (value == null) return '';
    const text = String(value);
    if (text.length <= length) return text;
    return text.slice(0, length).trimEnd() + '…';
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bracketsPipe',
  standalone: true
})
export class BracketsPipe implements PipeTransform {
  /**
   * Envuelve un texto con corchetes [ ]
   * @param value texto a envolver
   * @returns texto envuelto entre corchetes
   */
  transform(value: string | null | undefined): string {
    if (value == null) return '[]';
    return `[${String(value)}]`;
  }
}

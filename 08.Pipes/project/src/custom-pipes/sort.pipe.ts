import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true,
})
export class SortPipe implements PipeTransform {
  transform(value: number[] | string[], direction: 'asc' | 'desc' = 'asc') {
    if (!Array.isArray(value)) {
      return value;
    }

    const sorted = [...value].sort((a, b) => {
      if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
      } else {
        return a.toString().localeCompare(b.toString());
      }
    });

    return direction === 'desc' ? sorted.reverse() : sorted;
  }
}

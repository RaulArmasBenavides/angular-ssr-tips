import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormatter',
  standalone: true
})
export class PriceFormatterPipe implements PipeTransform {
  transform(value: number): string {
    console.count('priceFormatter pipe transform called');
    return `$${value.toFixed(2)}`;
  }
}

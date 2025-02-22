import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, num: number = 60): string {
    if (value.length == num) return value;
    return value.slice(0, num) + '...';
  }
}

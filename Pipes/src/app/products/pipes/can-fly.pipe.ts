import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'canFly',
})
export class CanFlyPipe implements PipeTransform {
  transform(value: boolean): 'vuela' | 'no vuela' {
    if (value) return 'vuela';
    else return 'no vuela';
  }
}

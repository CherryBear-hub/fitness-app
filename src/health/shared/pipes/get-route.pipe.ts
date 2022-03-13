import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getRoute',
})
export class GetRoutePipe implements PipeTransform {
  transform(value: Record<'id', string>, parentType: 'meals' | 'workouts'): string[] {
    return [`../${parentType}`, value.id];
  }
}

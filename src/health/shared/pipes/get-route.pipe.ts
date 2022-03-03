import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getMealRoute',
})
export class GetMealRoutePipe implements PipeTransform {
  transform(value: Record<'id', string>): string[] {
    return ['../meals', value.id];
  }
}

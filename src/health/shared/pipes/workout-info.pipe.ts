import { Pipe, PipeTransform } from '@angular/core';
import { Workout, WorkoutType } from '../../../utils/types';

@Pipe({
  name: 'workoutInfo',
})
export class WorkoutInfoPipe implements PipeTransform {
  transform(value: Workout): string {
    if (value.type == WorkoutType.Endurance) {
      return `Distance: ${value.endurance.distance}km; Duration: ${value.endurance.duration}min`;
    } else {
      return `Sets: ${value.strength.sets}; Reps: ${value.strength.reps}; Weight: ${value.strength.weight}kg`;
    }
  }
}

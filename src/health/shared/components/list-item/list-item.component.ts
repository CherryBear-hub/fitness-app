import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Meal, Workout} from "../../../../utils/types";

@Component({
  selector: 'fit-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  //TODO: Merge inputs/outputs to handle multiple types
  @Input() meal?: Meal;
  @Input() workout?: Workout;
  @Output() removeMeal = new EventEmitter<Meal>();
  @Output() removeWorkout = new EventEmitter<Workout>();

  deleteMeal() {
    this.removeMeal.emit(this.meal);
  }

  deleteWorkout(){
    this.removeWorkout.emit(this.workout);
  }
}

import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {instanceOfWorkout, Workout, WorkoutType} from '../../../../utils/types';

@Component({
  selector: 'fit-workout-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss'],
})
export class WorkoutFormComponent implements OnChanges{
  @Input() workout: Workout | {} = {};

  @Output() create = new EventEmitter<Workout>();
  @Output() update = new EventEmitter<Workout>();
  @Output() remove = new EventEmitter<void>();

  workoutExists = false;

  form = this.formBuilder.group({
    name: ['', Validators.required],
    type: WorkoutType.Strength
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if(instanceOfWorkout(this.workout)){
      this.workoutExists = true;
      this.form.patchValue(this.workout);
    }
    else{
      this.workoutExists = false;
    }
  }

  createWorkout() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateWorkout() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeWorkout() {
    this.remove.emit();
  }
}

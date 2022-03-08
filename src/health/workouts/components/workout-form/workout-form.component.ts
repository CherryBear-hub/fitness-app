import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  instanceOfWorkout,
  Workout,
  WorkoutType,
} from '../../../../utils/types';

@Component({
  selector: 'fit-workout-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss'],
})
export class WorkoutFormComponent implements OnChanges {
  @Input() workout: Workout | {} = {};

  @Output() create = new EventEmitter<Workout>();
  @Output() update = new EventEmitter<Workout>();
  @Output() remove = new EventEmitter<void>();

  workoutExists = false;
  workoutType = WorkoutType;
  placeholder = 'Benchpress';

  form = this.formBuilder.group({
    name: ['', Validators.required],
    type: WorkoutType.Strength,
    strength: this.formBuilder.group({
      reps: 0,
      sets: 0,
      weight: 0,
    }),
    endurance: this.formBuilder.group({
      distance: 0,
      duration: 0,
    }),
  });

  onTypeChange(value: WorkoutType) {
    this.placeholder =
      value === this.workoutType.Strength ? 'Benchpress' : 'Treadmill';
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if (instanceOfWorkout(this.workout)) {
      this.workoutExists = true;
      this.form.patchValue(this.workout);
    } else {
      this.workoutExists = false;
    }
  }

  createWorkout() {
    if (this.form.valid) {
      this.clearUnusedType();
      this.create.emit(this.form.value);
    }
  }

  updateWorkout() {
    if (this.form.valid) {
      this.clearUnusedType();
      this.update.emit(this.form.value);
    }
  }

  removeWorkout() {
    this.remove.emit();
  }

  clearUnusedType(): void {
    this.form.get('type')?.value == this.workoutType.Strength
      ? this.form.get('endurance')?.reset({
        distance: 0,
        duration: 0,
      })
      : this.form.get('strength')?.reset({
        reps: 0,
        sets: 0,
        weight: 0,
      });
  }
}

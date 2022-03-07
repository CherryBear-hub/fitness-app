import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { instanceOfMeal, Meal } from '../../../../utils/types';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'fit-meal-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss'],
})
export class MealFormComponent implements OnChanges {
  @Input() meal: Meal | {} = {};

  @Output() create = new EventEmitter<Meal>();
  @Output() update = new EventEmitter<Meal>();
  @Output() remove = new EventEmitter<void>();

  form = this.formBuilder.group({
    name: ['', Validators.required],
    ingredients: this.formBuilder.array(['']),
  });

  mealExists = false;

  constructor(private formBuilder: FormBuilder) {}

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (instanceOfMeal(this.meal)) {
      this.mealExists = true;
      const value = this.meal;
      this.form.patchValue(value);
      this.ingredients.clear();

      value.ingredients?.forEach((item) =>
        this.ingredients.push(new FormControl(item))
      );
    } else {
      this.mealExists = false;
    }
  }

  createMeal() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  addIngredient() {
    this.ingredients.push(this.formBuilder.control(''));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  updateMeal() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeMeal() {
    this.remove.emit();
  }
}

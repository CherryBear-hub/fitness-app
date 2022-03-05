import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output, SimpleChanges,
} from '@angular/core';
import { Meal } from '../../../../utils/types';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

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
  @Output() remove = new EventEmitter<Meal>();

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
    if(this.meal.hasOwnProperty('name')){
      this.mealExists = true;
      this.form.patchValue(this.meal)
    }
    else{
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
}

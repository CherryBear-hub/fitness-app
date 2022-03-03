import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output,} from '@angular/core';
import {Meal} from '../../../../utils/types';
import {FormArray, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'fit-meal-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss'],
})
export class MealFormComponent implements OnInit {
  @Output() create = new EventEmitter<Meal>();

  form = this.formBuilder.group({
    name: ['', Validators.required],
    ingredients: this.formBuilder.array(['']),
  });

  constructor(private formBuilder: FormBuilder) {}

  get ingredients(){
    return this.form.get('ingredients') as FormArray;
  }

  ngOnInit(): void {}

  createMeal() {
    if(this.form.valid){
      this.create.emit(this.form.value)
    }
  }

  addIngredient() {
    this.ingredients.push(this.formBuilder.control(''))
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }
}

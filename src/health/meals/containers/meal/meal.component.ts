import { Component } from '@angular/core';
import { Meal } from '../../../../utils/types';
import { MealsService } from '../../../shared/services/meals.service';

@Component({
  selector: 'fit-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent {
  constructor(private mealsService: MealsService) {}

  addMeal(event: Meal) {
    this.mealsService.addMeal(event);
  }
}

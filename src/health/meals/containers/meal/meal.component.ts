import {Component} from '@angular/core';
import {Meal} from "../../../../utils/types";

@Component({
  selector: 'fit-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent{

  constructor() { }

  addMeal(event: Meal) {
    console.log(event);
  }
}

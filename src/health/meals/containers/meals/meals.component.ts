import {Component, OnDestroy, OnInit} from '@angular/core';
import {MealsService} from "../../../shared/services/meals.service";
import {Store} from "store";
import {Observable, Subject, takeUntil} from "rxjs";
import {Meal} from "../../../../utils/types";

@Component({
  selector: 'fit-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit, OnDestroy {
  meals$?: Observable<Meal[]>;

  private unsubscribe$ = new Subject<void>();

  constructor(private mealsService: MealsService, private store: Store) { }

  ngOnInit(): void {
    this.mealsService.userMeals$.pipe(takeUntil(this.unsubscribe$)).subscribe();
    this.meals$ = this.store.selectedState<Meal[]>('meals');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  removeMeal(event: Meal) {
    this.mealsService.removeMeal(event.id).pipe(takeUntil(this.unsubscribe$)).subscribe();
  }
}

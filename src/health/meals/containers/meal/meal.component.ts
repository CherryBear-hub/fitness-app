import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meal } from '../../../../utils/types';
import { MealsService } from '../../../shared/services/meals.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, of, Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'fit-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit, OnDestroy {
  meal$: Observable<{} | Meal> = of({});
  private unsubscribe$ = new Subject<void>();

  constructor(
    private mealsService: MealsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.mealsService.userMeals$.pipe(takeUntil(this.unsubscribe$)).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.meal$ = this.mealsService.getMeal(
      this.activatedRoute.snapshot.paramMap.get('id')
    );
  }

  addMeal(event: Meal) {
    this.mealsService
      .addMeal(event)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.backToMeals());
  }

  backToMeals() {
    this.router.navigate(['meals']);
  }
}

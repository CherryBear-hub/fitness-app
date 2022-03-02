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

  private subscribe$ = new Subject<void>();

  constructor(private mealsService: MealsService, private store: Store) { }

  ngOnInit(): void {
    this.mealsService.userMeals$.pipe(takeUntil(this.subscribe$)).subscribe();
    this.meals$ = this.store.selectedState<Meal[]>('meals');
  }

  ngOnDestroy(): void {
    this.subscribe$.next();
    this.subscribe$.complete();
  }

}

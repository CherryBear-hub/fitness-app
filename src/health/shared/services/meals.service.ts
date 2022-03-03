import { Injectable } from '@angular/core';
import { Store } from 'store';
import { Meal, User } from '../../../utils/types';
import { FirebaseService } from '../../../services/firebase.service';
import { Observable, pluck, switchMap, take, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  userMeals$: Observable<Meal[]>;

  constructor(
    private store: Store,
    private firebase: FirebaseService,
    private router: Router
  ) {
    console.log('meal service');
    this.userMeals$ = this.uid.pipe(
      switchMap((uid) => firebase.getUserMeals(uid)),
      tap((value) => this.store.updateState({ meals: value }))
    );
  }

  get uid(): Observable<string> {
    return this.store.selectedState<User>('user').pipe(pluck('uid'));
  }

  addMeal(meal: Meal) {
    this.uid
      .pipe(
        switchMap((uid) => this.firebase.addUserMeal(uid, meal)),
        take(1)
      )
      .subscribe(() => this.backToMeals());
  }

  backToMeals() {
    this.router.navigate(['meals']);
  }
}

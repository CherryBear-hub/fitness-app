import { Injectable } from '@angular/core';
import { Store } from 'store';
import { Meal, User } from '../../../utils/types';
import { FirebaseService } from '../../../services/firebase.service';
import { Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  userMeals$: Observable<Meal[]>;

  constructor(private store: Store, private firebase: FirebaseService) {
    console.log('meal service');
    this.userMeals$ = this.store.selectedState<User>('user').pipe(
      switchMap((user) => firebase.getUserMeals(user.uid)),
      tap((value) => this.store.updateState({ meals: value }))
    );
  }
}

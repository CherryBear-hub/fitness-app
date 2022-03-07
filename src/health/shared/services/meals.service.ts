import { Injectable } from '@angular/core';
import { Store } from 'store';
import { Meal, User } from '../../../utils/types';
import { FirebaseService } from '../../../services/firebase.service';
import { filter, map, Observable, pluck, switchMap, tap } from 'rxjs';
import { DocumentReference } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  userMeals$: Observable<Meal[]>;

  constructor(private store: Store, private firebase: FirebaseService) {
    console.log('meal service');
    this.userMeals$ = this.uid.pipe(
      switchMap((uid) => firebase.getUserMeals(uid)),
      tap((value) => this.store.updateState({ meals: value }))
    );
  }

  get uid(): Observable<string> {
    return this.store.selectedState<User>('user').pipe(pluck('uid'));
  }

  getMeal(id: string | null): Observable<Meal | {}> {
    return this.store.selectedState<Meal[]>('meals').pipe(
      filter(Boolean),
      map((meals) => meals.find((meal) => meal.id === id) ?? {})
    );
  }

  addMeal(meal: Meal): Observable<DocumentReference<Meal>> {
    return this.uid.pipe(
      switchMap((uid) => this.firebase.addUserMeal(uid, meal))
    );
  }

  updateMeal(id: string, meal: Meal) {
    return this.uid.pipe(
      switchMap((uid) => this.firebase.updateUserMeal(uid, id, meal))
    );
  }

  removeMeal(id: string): Observable<void> {
    return this.uid.pipe(
      switchMap((uid) => this.firebase.deleteUserMeal(uid, id))
    );
  }
}

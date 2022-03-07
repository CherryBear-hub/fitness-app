import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import {Meal, Workout} from '../utils/types';
import { Store } from 'store';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private store: Store, private db: AngularFirestore) {}

  getUserMeals(uid: string): Observable<Meal[]> {
    return this.db
      .doc(`user/${uid}`)
      .collection<Meal>('meals')
      .valueChanges({ idField: 'id' });
  }

  getUserMeal(uid: string, id: string): Observable<Meal | undefined> {
    return this.db.doc<Meal>(`user/${uid}/meals/${id}`).valueChanges();
  }

  addUserMeal(uid: string, meal: Meal) {
    return from(this.db.collection<Meal>(`user/${uid}/meals`).add(meal));
  }

  updateUserMeal(uid: string, id: string, meal: Meal): Observable<void> {
    return from(this.db.doc<Meal>(`user/${uid}/meals/${id}`).update(meal));
  }

  deleteUserMeal(uid: string, id: string): Observable<void> {
    return from(this.db.doc<Meal>(`user/${uid}/meals/${id}`).delete());
  }

  getUserWorkouts(uid: string): Observable<Workout[]> {
    return this.db
      .doc(`user/${uid}`)
      .collection<Workout>('workouts')
      .valueChanges({ idField: 'id' });
  }


  getUserWorkout(uid: string, id: string): Observable<Workout | undefined> {
    return this.db.doc<Workout>(`user/${uid}/workouts/${id}`).valueChanges();
  }

  addUserWorkout(uid: string, workout: Workout) {
    return from(this.db.collection<Workout>(`user/${uid}/workouts`).add(workout));
  }

  updateUserWorkout(uid: string, id: string, workout: Workout): Observable<void> {
    return from(this.db.doc<Workout>(`user/${uid}/workouts/${id}`).update(workout));
  }

  deleteUserWorkout(uid: string, id: string): Observable<void> {
    return from(this.db.doc<Workout>(`user/${uid}/workouts/${id}`).delete());
  }
}

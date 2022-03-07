import { Injectable } from '@angular/core';
import { Store } from 'store';
import { FirebaseService } from '../../../services/firebase.service';
import { filter, map, Observable, pluck, switchMap, tap } from 'rxjs';
import { User, Workout } from '../../../utils/types';
import { DocumentReference } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class WorkoutsService {
  userWorkouts$: Observable<Workout[]>;

  constructor(private store: Store, private firebase: FirebaseService) {
    console.log('workout service');
    this.userWorkouts$ = this.uid.pipe(
      switchMap((uid) => this.firebase.getUserWorkouts(uid)),
      tap((value) => this.store.updateState({ workouts: value }))
    );
  }

  get uid(): Observable<string> {
    return this.store.selectedState<User>('user').pipe(pluck('uid'));
  }

  getWorkout(id: string | null): Observable<Workout | {}> {
    return this.store.selectedState<Workout[]>('workouts').pipe(
      filter(Boolean),
      map((workouts) => workouts.find((workout) => workout.id === id) ?? {})
    );
  }

  addWorkout(workout: Workout): Observable<DocumentReference<Workout>> {
    return this.uid.pipe(
      switchMap((uid) => this.firebase.addUserWorkout(uid, workout))
    );
  }

  updateWorkout(id: string, workout: Workout) {
    return this.uid.pipe(
      switchMap((uid) => this.firebase.updateUserWorkout(uid, id, workout))
    );
  }

  removeWorkout(id: string): Observable<void> {
    return this.uid.pipe(
      switchMap((uid) => this.firebase.deleteUserWorkout(uid, id))
    );
  }
}

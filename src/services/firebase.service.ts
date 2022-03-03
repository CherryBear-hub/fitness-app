import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { Meal } from '../utils/types';
import { Store } from 'store';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private store: Store, private db: AngularFirestore) {}

  getUserMeals(uid: string): Observable<any> {
    return this.db.doc(`user/${uid}`).collection<Meal>('meals').valueChanges();
  }

  addUserMeal(uid: string, meal: Meal) {
    return from(this.db.collection<Meal>(`user/${uid}/meals`).add(meal));
  }
}

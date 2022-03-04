import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {from, Observable} from 'rxjs';
import {Meal} from '../utils/types';
import {Store} from 'store';

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

  getUserMeal(uid: string, id: string): Observable<Meal | undefined>{
    return this.db.doc<Meal>(`user/${uid}/meals/${id}`).valueChanges();
  }

  addUserMeal(uid: string, meal: Meal) {
    return from(this.db.collection<Meal>(`user/${uid}/meals`).add(meal));
  }

  deleteUserMeal(uid: string, id: string) {
    return from(this.db.doc<Meal>(`user/${uid}/meals/${id}`).delete());
  }
}

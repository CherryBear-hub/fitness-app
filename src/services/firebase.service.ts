import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import {Meal} from "../utils/types";

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private db: AngularFirestore) {}

  getUserMeals(uid: string): Observable<Meal[]> {
    return this.db.collection<Meal>(`meals`).valueChanges();
  }
}

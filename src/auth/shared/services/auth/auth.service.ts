import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from 'store';
import { tap } from 'rxjs';
import { User } from '../../../../utils/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth$;

  constructor(private angularFireAuth: AngularFireAuth, private store: Store) {
    this.auth$ = this.angularFireAuth.authState.pipe(
      tap((value) => {
        if (!value) {
          this.store.updateState({ user: undefined });
          return;
        }
        const user: User = {
          email: value.email || '',
          uid: value.uid,
          authenticated: true,
        };
        this.store.updateState({ user: user });
      })
    );
  }

  createUser(email: string, password: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  logoutUser(){
    return this.angularFireAuth.signOut();
  }
}

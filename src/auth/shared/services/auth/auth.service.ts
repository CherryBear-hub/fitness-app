import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Store} from 'store';
import {User} from '../../../../utils/types';
import {from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private store: Store) {
    this.auth.authState.subscribe(value => {
      if (!value) {
        this.store.updateState({user: undefined});
        return;
      }
      const user: User = {
        email: value.email || '',
        uid: value.uid,
        authenticated: true,
      };
      this.store.updateState({user: user});
    });
  }

  //TODO: Complex unused return type
  createUser(email: string, password: string) {
    return from(this.auth.createUserWithEmailAndPassword(email, password));
  }

  loginUser(email: string, password: string) {
    return from(this.auth.signInWithEmailAndPassword(email, password));
  }

  logoutUser(): Observable<void> {
    return from(this.auth.signOut());
  }
}

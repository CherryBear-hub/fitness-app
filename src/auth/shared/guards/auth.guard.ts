import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { Store } from 'store';
import { User } from '../../../utils/types';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store
  ) {

  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.selectedState<User>('user').pipe(
      map((user) => {
        console.log(user);
        if (!user) {
          return this.router.parseUrl('/auth/login');
        }
        return !!user;
      })
    );
  }
}

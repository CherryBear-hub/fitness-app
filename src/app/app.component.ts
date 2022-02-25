import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/services/auth/auth.service';
import { Store } from 'store';
import { Observable, Subscription } from 'rxjs';
import { User } from '../utils/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'fitness app';

  user$?: Observable<User>;
  subscription = new Subscription();

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.authService.auth$.subscribe();
    this.user$ = this.store.selectedState('user');
  }

  async onLogout() {
    await this.authService.logoutUser();
    this.router.navigate(['auth', 'login'])
  }
}

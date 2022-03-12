import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/services/auth/auth.service';
import { Store } from 'store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { User } from '../utils/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  user$?: Observable<User>;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user$ = this.store.selectedState('user');
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onLogout() {
    this.authService
      .logoutUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.router.navigate(['auth', 'login']));
  }
}

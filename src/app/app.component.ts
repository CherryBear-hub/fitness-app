import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/shared/services/auth/auth.service';
import {Store} from 'store';
import {Observable} from 'rxjs';
import {User} from '../utils/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'fitness app';

  user$?: Observable<User>;

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.user$ = this.store.selectedState('user');
  }

  async onLogout() {
    await this.authService.logoutUser();
    this.router.navigate(['auth', 'login']);
  }
}

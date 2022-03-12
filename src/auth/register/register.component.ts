import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { catchError, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'fit-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
  error = '';
  private unsubscribe$ = new Subject<void>();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  registerUser(event: FormGroup) {
    const { email, password } = event.value;

    this.authService
      .createUser(email, password)
      .pipe(
        catchError((err) => {
          this.error = err.message;
          throw err;
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => this.router.navigate(['/']));
  }
}

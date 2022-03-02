import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { SharedModule } from './shared/shared.module';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
} from '@angular/fire/compat/auth-guard';

const redirectToDashboard = () => redirectLoggedInTo(['dashboard']);

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginModule),
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectToDashboard },
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./register/register.module').then((m) => m.RegisterModule),
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectToDashboard },
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule,
  ],
})
export class AuthModule {}

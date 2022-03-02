import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { Store } from 'store';
import { AuthModule } from '../auth/auth.module';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppNavComponent } from './components/app-nav/app-nav.component';
import { HealthModule } from '../health/health.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['auth/login']);

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
];

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppNavComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    HealthModule,
  ],
  providers: [Store],
  bootstrap: [AppComponent],
})
export class AppModule {}

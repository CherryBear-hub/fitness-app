import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AngularFireAuthGuard, redirectUnauthorizedTo,} from '@angular/fire/compat/auth-guard';
import {SharedModule} from "./shared/shared.module";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth/login']);

export const ROUTES: Routes = [
  {
    path: 'schedule',
    loadChildren: () =>
      import('./schedule/schedule.module').then((m) => m.ScheduleModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'meals',
    loadChildren: () =>
      import('./meals/meals.module').then((m) => m.MealsModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'workouts',
    loadChildren: () =>
      import('./workouts/workouts.module').then((m) => m.WorkoutsModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(ROUTES), SharedModule],
})
export class HealthModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/shared/guards/auth.guard';

export const ROUTES: Routes = [
  {
    path: 'schedule',
    loadChildren: () =>
      import('./schedule/schedule.module').then((m) => m.ScheduleModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'meals',
    loadChildren: () =>
      import('./meals/meals.module').then((m) => m.MealsModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'workouts',
    loadChildren: () =>
      import('./workouts/workouts.module').then((m) => m.WorkoutsModule),
    canLoad: [AuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(ROUTES)],
})
export class HealthModule {}

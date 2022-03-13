import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subject, takeUntil} from 'rxjs';
import {Workout} from '../../../../utils/types';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkoutsService} from '../../../shared/services/workouts.service';

@Component({
  selector: 'fit-workout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent implements OnInit, OnDestroy  {
  workout$: Observable<{} | Workout> = of({});
  private unsubscribe$ = new Subject<void>();

  constructor(
    private workoutsService: WorkoutsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    //TODO: List and individual both subscribe to workouts. Needed if navigating by url. Find a better way.
    this.workoutsService.userWorkouts$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.workout$ = this.workoutsService.getWorkout(
      this.activatedRoute.snapshot.paramMap.get('id')
    );
  }

  addWorkout(event: Workout) {
    this.workoutsService
      .addWorkout(event)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.backToWorkouts());
  }

  updateWorkout(event: Workout) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.workoutsService
        .updateWorkout(id, event)
        .subscribe(() => this.backToWorkouts());
    }
  }

  removeWorkout() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.workoutsService
        .removeWorkout(id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => this.backToWorkouts());
    }
  }

  backToWorkouts() {
    this.router.navigate(['workouts']);
  }
}

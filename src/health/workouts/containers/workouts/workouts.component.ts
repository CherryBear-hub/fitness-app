import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {Workout} from "../../../../utils/types";
import {WorkoutsService} from "../../../shared/services/workouts.service";
import {Store} from "store";

@Component({
  selector: 'fit-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit, OnDestroy {
  workouts$?: Observable<Workout[]>
  private unsubscribe$ = new Subject<void>();

  constructor(private workoutsService: WorkoutsService, private store: Store) { }

  ngOnInit(): void {
    this.workoutsService.userWorkouts$.pipe(takeUntil(this.unsubscribe$)).subscribe();
    this.workouts$ = this.store.selectedState<Workout[]>('workouts');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  removeWorkout(event: Workout) {
    this.workoutsService.removeWorkout(event.id).pipe(takeUntil(this.unsubscribe$)).subscribe();
  }
}

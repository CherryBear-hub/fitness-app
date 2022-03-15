import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ScheduleService } from '../../../shared/services/schedule.service';
import { Store } from 'store';
import {Meal, ScheduleList, ScheduleSection, Workout} from '../../../../utils/types';
import { MealsService } from '../../../shared/services/meals.service';
import { WorkoutsService } from '../../../shared/services/workouts.service';

@Component({
  selector: 'fit-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit, OnDestroy {
  date$?: Observable<Date>;
  schedule$?: Observable<ScheduleList>;
  selected$?: Observable<ScheduleSection>;
  list$?: Observable<Meal[] | Workout[]>;

  open = false;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store,
    private mealsService: MealsService,
    private workoutsService: WorkoutsService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
    this.date$ = this.store.selectedState<Date>('date');
    this.schedule$ = this.store.selectedState<ScheduleList>('schedule');
    this.selected$ = this.store.selectedState<ScheduleSection>('selected');
    this.list$ = this.store.selectedState<Meal[] | Workout[]>('list')

    this.scheduleService.schedule$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
    this.scheduleService.selected$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
    this.scheduleService.list$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
    this.scheduleService.items$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
    this.mealsService.userMeals$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
    this.workoutsService.userWorkouts$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  changeSection(event: ScheduleSection) {
    this.open = true;
    this.scheduleService.selectSection(event);
  }

  assignItem(items: string[]) {
    this.scheduleService.updateItems(items);
    this.open = false;
  }

  closeAssign() {
    this.open = false;
  }
}

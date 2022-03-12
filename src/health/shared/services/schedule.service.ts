import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Observable,
  pluck,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { Store } from 'store';
import { FirebaseService } from '../../../services/firebase.service';
import { ScheduleItem, ScheduleList, User } from '../../../utils/types';

export interface DayLimit {
  startAt: number;
  endAt: number;
}

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private date$ = new BehaviorSubject(new Date());
  private section$ = new Subject();

  schedule$: Observable<ScheduleList> = this.date$.pipe(
    tap((value) => this.store.updateState({ date: value })),
    map((day) => ScheduleService.getDaysEndpoints(day)),
    switchMap(({ startAt, endAt }) => this.getSchedule(startAt, endAt)),
    map((data) => ScheduleService.fillScheduleList(data)),
    tap((data) => this.store.updateState({ schedule: data }))
  );

  selected$ = this.section$.pipe(
    tap((value) => this.store.updateState({ selected: value }))
  );

  constructor(private store: Store, private firebase: FirebaseService) {}

  get uid(): Observable<string> {
    return this.store.selectedState<User>('user').pipe(pluck('uid'));
  }

  updateDate(date: Date) {
    this.date$.next(date);
  }

  private static getDaysEndpoints(day: Date): DayLimit {
    const startAt = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate()
    ).getTime();

    const endAt =
      new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1).getTime() -
      1;

    return { startAt, endAt };
  }

  private static fillScheduleList(data: ScheduleItem[]): ScheduleList {
    const mapped: ScheduleList = {};

    for (const item of data) {
      if (!mapped[item.section]) {
        mapped[item.section] = item;
      }
    }

    return mapped;
  }

  selectSection(event: any) {
    this.section$.next(event);
  }

  private getSchedule(
    startAt: number,
    endAt: number
  ): Observable<ScheduleItem[]> {
    return this.uid.pipe(
      switchMap((uid) => this.firebase.getUserSchedule(uid, startAt, endAt))
    );
  }
}

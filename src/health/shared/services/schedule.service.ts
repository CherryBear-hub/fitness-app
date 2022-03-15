import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Observable,
  pluck,
  Subject,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Store } from 'store';
import { FirebaseService } from '../../../services/firebase.service';
import {
  Meal,
  ScheduleItem,
  ScheduleList,
  ScheduleSection,
  User,
  Workout,
} from '../../../utils/types';

export interface DayLimit {
  startAt: number;
  endAt: number;
}

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private date$ = new BehaviorSubject(new Date());
  private section$ = new Subject<ScheduleSection>();
  private itemList$ = new Subject<any>();

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

  list$ = this.section$.pipe(
    switchMap((value: ScheduleSection) =>
      this.store.selectedState<Meal[] | Workout[]>(value.type)
    ),
    tap((value) => this.store.updateState({ list: value }))
  );

  items$ = this.itemList$.pipe(
    withLatestFrom(this.section$),
    switchMap(([items, section]) => {
      const id = section.data?.id;

      const defaults: ScheduleItem = {
        workouts: [],
        meals: [],
        section: section.section,
        timestamp: new Date(section.day).getTime(),
      };

      const payload = { ...(id ? section.data : defaults), ...items };

      if (id) {
        return this.updateSection(id, payload);
      } else {
        return this.createSection(payload);
      }
    })
  );

  constructor(private store: Store, private firebase: FirebaseService) {}

  get uid(): Observable<string> {
    return this.store.selectedState<User>('user').pipe(pluck('uid'));
  }

  updateDate(date: Date) {
    this.date$.next(date);
  }

  selectSection(event: ScheduleSection) {
    this.section$.next(event);
  }

  updateItems(items: string[]) {
    this.itemList$.next(items);
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

  private getSchedule(
    startAt: number,
    endAt: number
  ): Observable<ScheduleItem[]> {
    return this.uid.pipe(
      switchMap((uid) => this.firebase.getUserSchedule(uid, startAt, endAt))
    );
  }

  private updateSection(id: string, payload: ScheduleItem): Observable<void> {
    return this.uid.pipe(
      switchMap((uid) => this.firebase.updateUserSchedule(uid, id, payload))
    );
  }

  private createSection(payload: any) {
    return this.uid.pipe(
      switchMap((uid) => this.firebase.addUserSchedule(uid, payload))
    );
  }
}

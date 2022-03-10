import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Store } from 'store';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private date$ = new BehaviorSubject(new Date());

  schedule$: Observable<any> = this.date$.pipe(
    tap((value) => this.store.updateState({ date: value }))
  );

  constructor(private store: Store) {}
}

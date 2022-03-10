import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {ScheduleService} from "../../../shared/services/schedule.service";
import {Store} from "store";

@Component({
  selector: 'fit-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {

  date$?: Observable<Date>;

  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store, private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.date$ = this.store.selectedState<Date>('date');

    this.scheduleService.schedule$.pipe(takeUntil(this.unsubscribe$)).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  changeDate(date: Date){
    this.scheduleService.updateDate(date);
  }
}

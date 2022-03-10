import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'fit-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss']
})
export class ScheduleCalendarComponent implements OnInit {

  selectedDay: Date = new Date();
  @Output() change = new EventEmitter<Date>();

  @Input() set date(date: Date | null){
    if(date){
      this.selectedDay = new Date(date.getTime());
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

  onChange(weekOffset: number) {
    const startOfWeek = this.getStartOfTheWeek(new Date());
    const startDate = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate());
    startDate.setDate(startDate.getDate() + (weekOffset * 7));
    this.change.emit(startDate);
  }

  private getStartOfTheWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }
}

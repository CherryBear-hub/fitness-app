import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'fit-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss'],
})
export class ScheduleCalendarComponent implements OnChanges {
  selectedDayIndex: number = 0;
  selectedDay: Date = new Date();
  selectedWeek: Date = new Date();

  @Output() change = new EventEmitter<Date>();
  @Input() set date(date: Date | null) {
    if (date) {
      this.selectedDay = new Date(date.getTime());
    }
  }

  ngOnChanges() {
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfTheWeek(new Date(this.selectedDay));
  }

  onChange(weekOffset: number) {
    const startOfWeek = this.getStartOfTheWeek(new Date());
    const startDate = new Date(
      startOfWeek.getFullYear(),
      startOfWeek.getMonth(),
      startOfWeek.getDate()
    );
    startDate.setDate(startDate.getDate() + weekOffset * 7);
    this.change.emit(startDate);
  }

  selectDay(index: number) {
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + index);
    this.change.emit(selectedDay);
  }

  private getStartOfTheWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  private getToday(date: Date) {
    let today = date.getDay() - 1;
    if (today < 0) {
      today = 6;
    }

    return today;
  }
}

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import {
  SCHEDULE_SECTIONS,
  ScheduleItem,
  ScheduleList,
} from '../../../../utils/types';

@Component({
  selector: 'fit-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss'],
})
export class ScheduleCalendarComponent implements OnChanges {
  selectedDayIndex = 0;
  selectedDay = new Date();
  selectedWeek = new Date();

  sections = SCHEDULE_SECTIONS;

  @Output() changeDate = new EventEmitter<Date>();
  @Input() set date(date: Date | null) {
    if (date) {
      this.selectedDay = new Date(date.getTime());
    }
  }

  @Input() items?: ScheduleList | null;

  private static getStartOfTheWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  private static getToday(date: Date) {
    let today = date.getDay() - 1;
    if (today < 0) {
      today = 6;
    }

    return today;
  }

  getSection(name: string): ScheduleItem {
    return (this.items && this.items[name]) || {};
  }

  ngOnChanges() {
    this.selectedDayIndex = ScheduleCalendarComponent.getToday(this.selectedDay);
    this.selectedWeek = ScheduleCalendarComponent.getStartOfTheWeek(new Date(this.selectedDay));
  }

  onChangeDate(weekOffset: number) {
    const startOfWeek = ScheduleCalendarComponent.getStartOfTheWeek(new Date());
    const startDate = new Date(
      startOfWeek.getFullYear(),
      startOfWeek.getMonth(),
      startOfWeek.getDate()
    );
    startDate.setDate(startDate.getDate() + weekOffset * 7);
    this.changeDate.emit(startDate);
  }

  selectDay(index: number) {
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + index);
    this.changeDate.emit(selectedDay);
  }
}

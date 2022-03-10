import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'fit-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss']
})
export class ScheduleCalendarComponent implements OnInit {

  @Input() date?: Date | null;

  constructor() { }

  ngOnInit(): void {
  }

}

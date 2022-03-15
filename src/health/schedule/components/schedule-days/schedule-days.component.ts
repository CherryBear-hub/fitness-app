import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {WEEK_DAYS} from "../../../../utils/types";

@Component({
  selector: 'fit-schedule-days',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-days.component.html',
  styleUrls: ['./schedule-days.component.scss']
})
export class ScheduleDaysComponent {
  days = WEEK_DAYS;
  @Input() selected = 0;
  @Output() select = new EventEmitter<number>()

  selectDay(index: number) {
    this.select.emit(index)
  }
}

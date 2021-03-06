import { Component, EventEmitter, Input, Output } from '@angular/core';
import {Meal, ScheduleItem, ScheduleSectionBase, SectionType, Workout} from '../../../../utils/types';

@Component({
  selector: 'fit-schedule-section',
  templateUrl: './schedule-section.component.html',
  styleUrls: ['./schedule-section.component.scss'],
})
export class ScheduleSectionComponent {
  @Input() name: string = '';
  @Input() section?: ScheduleItem;

  @Output() select = new EventEmitter<ScheduleSectionBase>();

  onSelect(type: SectionType, assigned: Meal[] | Workout[] = []) {
    const data = this.section;
    this.select.emit({
      type,
      assigned,
      data
    });
  }
}

import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'fit-schedule-controls',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-controls.component.html',
  styleUrls: ['./schedule-controls.component.scss']
})
export class ScheduleControlsComponent implements OnInit {
  @Input() selected: Date = new Date();
  @Output() move = new EventEmitter<number>()

  offset = 0;

  constructor() { }

  ngOnInit(): void {
  }

  moveDate(offset: number) {
    this.offset = offset;
    this.move.emit(offset);
  }
}

import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Meal} from "../../../../utils/types";

@Component({
  selector: 'fit-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() item?: Meal
  @Output() remove = new EventEmitter<Meal>();

  showDelete = false;

  constructor() { }

  removeItem() {
    this.remove.emit(this.item)
  }

  toggle() {
    this.showDelete = !this.showDelete;
  }
}

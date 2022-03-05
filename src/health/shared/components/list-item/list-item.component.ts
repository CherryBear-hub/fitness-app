import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
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

  removeItem() {
    this.remove.emit(this.item)
  }
}

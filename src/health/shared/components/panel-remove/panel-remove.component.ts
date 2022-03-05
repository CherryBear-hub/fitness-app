import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'fit-panel-remove',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './panel-remove.component.html',
  styleUrls: ['./panel-remove.component.scss']
})
export class PanelRemoveComponent {
  @Output() remove = new EventEmitter<void>();
  showDelete = false;

  removeItem() {
    this.remove.emit()
  }

  toggle() {
    this.showDelete = !this.showDelete;
  }

}

import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../../utils/types";

@Component({
  selector: 'fit-app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {

  @Input() user?: User | null;
  @Output() logout = new EventEmitter<void>();

  logoutUser() {
    this.logout.emit();
  }
}

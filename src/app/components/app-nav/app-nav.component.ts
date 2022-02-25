import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'fit-app-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss'],
})
export class AppNavComponent {}

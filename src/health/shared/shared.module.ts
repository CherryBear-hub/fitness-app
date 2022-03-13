import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ListItemComponent } from './components/list-item/list-item.component';
import { GetRoutePipe } from './pipes/get-route.pipe';
import { RouterModule } from '@angular/router';
import { PanelRemoveComponent } from './components/panel-remove/panel-remove.component';
import { WorkoutInfoPipe } from './pipes/workout-info.pipe';

@NgModule({
  declarations: [
    ListItemComponent,
    PanelRemoveComponent,
    WorkoutInfoPipe,
    GetRoutePipe,
  ],
  imports: [CommonModule, AngularFireDatabaseModule, RouterModule],
  exports: [ListItemComponent, PanelRemoveComponent, WorkoutInfoPipe],
})
export class SharedModule {}

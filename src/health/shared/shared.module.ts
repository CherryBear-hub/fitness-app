import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ListItemComponent } from './components/list-item/list-item.component';
import { GetRoutePipe } from './pipes/get-route.pipe';
import { RouterModule } from '@angular/router';
import { PanelRemoveComponent } from './components/panel-remove/panel-remove.component';
import { WorkoutInfoPipe } from './pipes/workout-info.pipe';
import { JoinPipe } from './pipes/join.pipe';

@NgModule({
  declarations: [
    ListItemComponent,
    PanelRemoveComponent,
    WorkoutInfoPipe,
    GetRoutePipe,
    JoinPipe,
  ],
  imports: [CommonModule, AngularFireDatabaseModule, RouterModule],
  exports: [ListItemComponent, PanelRemoveComponent, WorkoutInfoPipe, JoinPipe],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ListItemComponent } from './components/list-item/list-item.component';
import { GetMealRoutePipe } from './pipes/get-route.pipe';
import { RouterModule } from '@angular/router';
import { PanelRemoveComponent } from './components/panel-remove/panel-remove.component';

@NgModule({
  declarations: [ListItemComponent, GetMealRoutePipe, PanelRemoveComponent],
  imports: [CommonModule, AngularFireDatabaseModule, RouterModule],
  exports: [ListItemComponent, PanelRemoveComponent],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ListItemComponent } from './components/meal-item/list-item.component';

@NgModule({
  declarations: [
    ListItemComponent
  ],
  imports: [CommonModule, AngularFireDatabaseModule],
  exports: [ListItemComponent]
})
export class SharedModule {}

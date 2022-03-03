import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ListItemComponent } from './components/meal-item/list-item.component';
import { GetMealRoutePipe } from './pipes/get-route.pipe';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    ListItemComponent,
    GetMealRoutePipe
  ],
  imports: [CommonModule, AngularFireDatabaseModule, RouterModule],
  exports: [ListItemComponent]
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { Store } from 'store';

export const ROUTES: Routes = [];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(ROUTES)],
  providers: [Store],
  bootstrap: [AppComponent],
})
export class AppModule {}

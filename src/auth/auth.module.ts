import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { SharedModule } from './shared/shared.module';
import { FirebaseOptions } from 'firebase/app';

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./register/register.module').then((m) => m.RegisterModule),
      },
    ],
  },
];

export const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyDebBmMIVv3zozT-amZtQZjdCs81kwazXg',
  authDomain: 'fitness-app-75e97.firebaseapp.com',
  databaseURL:
    'https://fitness-app-75e97-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'fitness-app-75e97',
  storageBucket: 'fitness-app-75e97.appspot.com',
  messagingSenderId: '329706672945',
  appId: '1:329706672945:web:bcdfc85e883535c497d610',
  measurementId: 'G-T23F6DNM00',
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule,
  ],
})
export class AuthModule {}

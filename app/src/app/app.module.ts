import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from './components/material.module';

//firestore
import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';
//cloud functions
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/functions';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//auth
import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/auth';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth'

/* 
This function is necessary to properly load logged in user after page refresh.
Otherwise, user will be logged out.
There is a bug in angularfire which is fixed by delaying auth emulator.
Use this function only in development environment!
*/ 
// export function initializeApp1(afa: AngularFireAuth): any {
//   return () => {
//     return new Promise<void>(resolve => {
//       afa.useEmulator(`http://localhost:9099/`);
//       setTimeout(() => resolve(), 100);
//     });
//   };
// }

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    AngularFireAuthModule
  ],
  providers: [
    {
      provide: USE_FIRESTORE_EMULATOR,
      useValue: environment.production ? undefined : ['localhost', 8080]
    },
    {
      provide: USE_FUNCTIONS_EMULATOR,
      useValue: environment.production ? undefined : ['localhost', 5001]
    },
    {
      provide: USE_AUTH_EMULATOR,
      useValue: environment.production ? undefined : ['localhost', 9099]
    },
    // Delay the app initialization process by 100ms
    // Use this function only in development environment!
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeApp1,
    //   // for some reason this dependency is necessary for this solution to work.
    //   // Maybe in order to trigger the constructor *before* waiting 100ms?
    //   deps: [AngularFireAuth],
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

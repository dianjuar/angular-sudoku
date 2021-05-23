import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { SudokuModule } from './sudoku/sudoku.module';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,

    MatToolbarModule,

    SudokuModule,

    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        // strictStateImmutability and strictActionImmutability are enabled by default
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    EffectsModule.forRoot([]),

    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

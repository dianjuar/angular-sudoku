import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardModule } from './board/board.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BoardModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

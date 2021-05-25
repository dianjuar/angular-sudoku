import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayPageComponent } from './play-page.component';
import { BoardModule } from './board/board.module';

@NgModule({
  declarations: [PlayPageComponent],
  imports: [CommonModule, BoardModule],
})
export class PlayPageModule {}

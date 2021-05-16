import { NgModule } from '@angular/core';

import { BoardComponent } from './board.component';
import { SquareComponent } from './square/square.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BoardComponent, SquareComponent],
  imports: [SharedModule],
  exports: [BoardComponent],
})
export class BoardModule {}

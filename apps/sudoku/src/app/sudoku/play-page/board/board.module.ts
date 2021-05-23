import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { BoardComponent } from './board.component';
import { SquareComponent } from './square/square.component';

@NgModule({
  declarations: [BoardComponent, SquareComponent],
  imports: [SharedModule],
  exports: [BoardComponent],
})
export class BoardModule {}

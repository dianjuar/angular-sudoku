import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { AskDifficultyComponent } from './ask-difficulty.component';

@NgModule({
  declarations: [AskDifficultyComponent],
  imports: [CommonModule, MatButtonModule],
})
export class AskDifficultyModule {}

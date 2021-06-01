import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromSudoku from './+state/sudoku.reducer';
import { SudokuFacade } from './+state/sudoku.facade';
import { SudokuEffects } from './+state/sudoku.effects';

import { SudokuRoutingModule } from './sudoku-routing.module';
import { AskDifficultyModule } from './ask-difficulty/ask-difficulty.module';
import { PlayPageModule } from './play-page/play-page.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SudokuRoutingModule,

    PlayPageModule,
    AskDifficultyModule,

    StoreModule.forFeature(fromSudoku.SUDOKU_FEATURE_KEY, fromSudoku.reducer),
    EffectsModule.forFeature([]),
    EffectsModule.forFeature([SudokuEffects]),
  ],
  providers: [SudokuFacade],
})
export class SudokuModule {}

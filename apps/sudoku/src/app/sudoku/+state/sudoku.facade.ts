import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import * as SudokuActions from './sudoku.actions';
import { DifficultyLevels } from './sudoku.models';
import * as SudokuSelectors from './sudoku.selectors';

@Injectable()
export class SudokuFacade {
  boardString$ = this.store.pipe(select(SudokuSelectors.getBoardString));
  board$ = this.store.pipe(select(SudokuSelectors.getBoardStructured));
  selectedLevelOfDifficulty$ = this.store.pipe(
    select(SudokuSelectors.getSelectedLevelDifficulty)
  );

  constructor(private store: Store) {}

  initApp() {
    this.store.dispatch(SudokuActions.initApplication());
  }

  createBoardEasy() {
    this.store.dispatch(
      SudokuActions.selectDifficulty({ level: DifficultyLevels.EASY })
    );
  }

  createBoardMedium() {
    this.store.dispatch(
      SudokuActions.selectDifficulty({ level: DifficultyLevels.MEDIUM })
    );
  }

  createBoardHard() {
    this.store.dispatch(
      SudokuActions.selectDifficulty({ level: DifficultyLevels.HARD })
    );
  }
}

import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SUDOKU_FEATURE_KEY,
  State,
  SudokuPartialState,
} from './sudoku.reducer';

// Lookup the 'Sudoku' feature state managed by NgRx
export const getSudokuState = createFeatureSelector<SudokuPartialState, State>(
  SUDOKU_FEATURE_KEY
);

export const getBoardStructured = createSelector(
  getSudokuState,
  (state: State) => state.board.structured
);

export const getSelectedLevelDifficulty = createSelector(
  getSudokuState,
  (state: State) => state.selectedDifficulty
);

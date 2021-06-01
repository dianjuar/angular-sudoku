import { createReducer, on, Action } from '@ngrx/store';

import * as sudokuUtils from '@sudoku/sudoku-utils';

import * as SudokuActions from './sudoku.actions';
import { DifficultyLevels, ISudokuBoard, ISudokuSquare } from './sudoku.models';

export const SUDOKU_FEATURE_KEY = 'sudoku';

export interface State {
  board?: {
    simple: string;
    structured: ISudokuBoard;
  };
  selectedDifficulty?: DifficultyLevels;
}

export interface SudokuPartialState {
  readonly [SUDOKU_FEATURE_KEY]: State;
}

export const initialState: State = {};

const sudokuReducer = createReducer(
  initialState,
  on(SudokuActions.selectDifficulty, (state, { level }) => ({
    ...state,
    selectedDifficulty: level,
  })),
  on(SudokuActions.createStructuredBoard, (state, { board }) => ({
    ...state,
    board: {
      simple: board,
      structured: sudokuUtils.buildStructuredBoard<ISudokuSquare>(
        board,
        (): ISudokuSquare => ({ isInitial: false }),
        (value): ISudokuSquare => ({ isInitial: true, value: parseInt(value) })
      ),
    },
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return sudokuReducer(state, action);
}

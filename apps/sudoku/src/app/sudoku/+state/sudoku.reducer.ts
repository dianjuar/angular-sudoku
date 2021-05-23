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
    ...generateBoard(level),
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return sudokuReducer(state, action);
}

function generateBoard(level: DifficultyLevels): Pick<State, 'board'> {
  let boardString: string;

  switch (level) {
    case DifficultyLevels.EASY:
      boardString = sudokuUtils.generateByDifficulty('easy');
      break;
    case DifficultyLevels.MEDIUM:
      boardString = sudokuUtils.generateByDifficulty('medium');
      break;
    case DifficultyLevels.HARD:
      boardString = sudokuUtils.generateByDifficulty('hard');
      break;
  }

  const boardStructured = sudokuUtils.buildStructuredBoard<ISudokuSquare>(
    boardString,
    () => ({ isInitial: false }),
    (value) => ({ isInitial: true, value: parseInt(value) })
  );

  return {
    board: {
      simple: boardString,
      structured: boardStructured,
    },
  };
}

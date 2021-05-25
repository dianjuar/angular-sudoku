import { DifficultyLevels, ISudokuBoard } from './sudoku.models';
import {
  initialState,
  SUDOKU_FEATURE_KEY,
  SudokuPartialState,
} from './sudoku.reducer';
import * as SudokuSelectors from './sudoku.selectors';

describe('Sudoku Selectors', () => {
  let state: SudokuPartialState;

  let boardStr: string;
  let boardStructured: ISudokuBoard;

  beforeEach(() => {
    boardStr = new Array(81).fill('').reduce((acc, _, index) => {
      acc += '.';

      if (index === 80) {
        acc += '1';
      }

      return acc;
    }, '');

    boardStructured = new Array(9).fill(
      new Array(9).fill({ isInitial: false })
    );
    boardStructured[8][8] = {
      isInitial: true,
      value: 1,
    };

    state = {
      [SUDOKU_FEATURE_KEY]: {
        ...initialState,
        selectedDifficulty: DifficultyLevels.HARD,
        board: {
          simple: boardStr,
          structured: boardStructured,
        },
      },
    };
  });

  it('getSelectedLevelDifficulty() should return level of difficulty', () => {
    const results = SudokuSelectors.getSelectedLevelDifficulty(state);

    expect(results).toEqual(DifficultyLevels.HARD);
  });

  it('getBoardStructured() should return the structured board', () => {
    const results = SudokuSelectors.getBoardStructured(state);

    expect(results).toEqual(boardStructured);
  });
});

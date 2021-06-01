import * as SudokuTestUtils from '../__mocks__/__utils__';
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
    boardStr = SudokuTestUtils.getSuperSimpleBoardStr();
    boardStructured = SudokuTestUtils.getSuperSimpleBoardStructured();

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

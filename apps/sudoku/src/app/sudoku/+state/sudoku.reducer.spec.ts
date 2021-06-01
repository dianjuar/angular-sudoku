import { DifficultyLevels } from './sudoku.models';
import * as SudokuActions from './sudoku.actions';
import { State, initialState, reducer } from './sudoku.reducer';

import * as SudokuTestUtils from '../__mocks__/__utils__';

describe('Sudoku Reducer', () => {
  describe('valid Sudoku actions', () => {
    it('should generate a board after level selection', () => {
      const action = SudokuActions.selectDifficulty({
        level: DifficultyLevels.MEDIUM,
      });

      const result: State = reducer(initialState, action);

      expect(result.selectedDifficulty).toBe(DifficultyLevels.MEDIUM);
    });

    describe('createStructuredBoard', () => {
      let action: ReturnType<typeof SudokuActions.createStructuredBoard>;

      beforeEach(() => {
        action = SudokuActions.createStructuredBoard({
          board: SudokuTestUtils.getSuperSimpleBoardStr(),
        });
      });
      it('should create the structured board', () => {
        const result: State = reducer(initialState, action);

        expect(result.board.structured).toEqual(
          SudokuTestUtils.getSuperSimpleBoardStructured()
        );
      });

      it('should set the board string', () => {
        const result: State = reducer(initialState, action);

        expect(result.board.simple).toBe(
          SudokuTestUtils.getSuperSimpleBoardStr()
        );
      });
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as never;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});

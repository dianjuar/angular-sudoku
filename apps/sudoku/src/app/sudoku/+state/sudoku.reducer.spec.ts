import { DifficultyLevels } from './sudoku.models';
import * as SudokuActions from './sudoku.actions';
import { State, initialState, reducer } from './sudoku.reducer';

describe('Sudoku Reducer', () => {
  describe('valid Sudoku actions', () => {
    it('should generate a board after level selection', () => {
      const action = SudokuActions.selectDifficulty({
        level: DifficultyLevels.MEDIUM,
      });

      const result: State = reducer(initialState, action);

      expect(result.selectedDifficulty).toBe(DifficultyLevels.MEDIUM);
      expect(result.board.structured).not.toBeNull();
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

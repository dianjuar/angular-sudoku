import { buildStructuredBoard, stringToGrid } from './sudoku-utils';

describe('sudokuUtils', () => {
  describe('buildStructuredBoard', () => {
    type ISquare = { value?: number };
    const emptyCase = (): ISquare => ({});
    const withValueCase = (value): ISquare => ({ value: parseInt(value) });

    it('should generate the board with the right structure', () => {
      const boardStr =
        '.17..69..356194.2..89..71.6.65...273872563419.43...685521......798..53..634...59.';
      const expectedBoard = stringToGrid(boardStr).map((row) =>
        row.map((value) => (value === '.' ? emptyCase() : withValueCase(value)))
      );

      const structuredBoard = buildStructuredBoard<ISquare>(
        boardStr,
        emptyCase,
        withValueCase
      );

      expect(structuredBoard).toEqual(expectedBoard);
    });
  });
});

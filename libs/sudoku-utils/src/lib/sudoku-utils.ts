import * as SudokuToolCollection from 'sudokutoolcollection';

const sudoku = SudokuToolCollection();

export function stringToGrid(gridStr: string): string[][] {
  return sudoku.conversions.stringToGrid(gridStr);
}

export function generateByDifficulty(level: 'easy' | 'medium' | 'hard') {
  return sudoku.generator.generate(level);
}

export function buildStructuredBoard<T>(
  boardStr: string,
  emptySquare: (value: string) => T,
  valueSquare: (value: string) => T
): T[][] {
  const boardGrid: string[][] = stringToGrid(boardStr);

  const boardStructured = boardGrid.map((row) =>
    row.map(
      (square): T =>
        square === '.' ? emptySquare(square) : valueSquare(square)
    )
  );

  return boardStructured;
}

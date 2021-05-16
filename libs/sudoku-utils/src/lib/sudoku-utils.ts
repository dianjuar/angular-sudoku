import * as SudokuToolCollection from 'sudokutoolcollection';

const sudoku = SudokuToolCollection();

export function stringToGrid(gridStr: string) {
  return sudoku.conversions.stringToGrid(gridStr);
}

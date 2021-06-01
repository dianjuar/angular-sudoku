import { ISudokuBoard } from '../+state/sudoku.models';

export function getSuperSimpleBoardStr(): string {
  return new Array(80).fill('.').join('') + '1';
}

export function getSuperSimpleBoardStructured(): ISudokuBoard {
  const boardStructured = new Array(9)
    .fill(null)
    .map(() => new Array(9).fill({ isInitial: false }));

  boardStructured[8][8] = {
    isInitial: true,
    value: 1,
  };

  return boardStructured;
}

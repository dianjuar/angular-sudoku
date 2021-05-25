export enum DifficultyLevels {
  EASY,
  MEDIUM,
  HARD,
}

export type ISudokuBoard = ISudokuSquare[][];

export interface ISudokuSquare {
  value?: number;
  isInitial: boolean;
}

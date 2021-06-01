import { Injectable } from '@angular/core';
import { getSuperSimpleBoardStr } from '../../../../sudoku/__mocks__/__utils__';

import { of } from 'rxjs/internal/observable/of';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SudokuStorageService {
  private shouldReturnEmptyBoard = false;
  private customStoreData: string;

  supported = jest.fn().mockImplementation(() => of(true));
  getBoard = jest
    .fn()
    .mockImplementation(() =>
      this.shouldReturnEmptyBoard
        ? of(null)
        : this.customStoreData
        ? this.customStoreData
        : of(getSuperSimpleBoardStr())
    );
  saveBoard = jest.fn().mockImplementation(() => EMPTY);

  setShouldReturnEmptyBoard(shouldReturnEmptyBoard: boolean) {
    this.shouldReturnEmptyBoard = shouldReturnEmptyBoard;
  }

  setCustomStoreData(storeData: string) {
    this.customStoreData = storeData;
  }
}

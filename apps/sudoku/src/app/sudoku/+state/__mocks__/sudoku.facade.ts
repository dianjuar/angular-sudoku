import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ISudokuBoard } from '../sudoku.models';

@Injectable()
export class SudokuFacade {
  readonly defaultBoard: ISudokuBoard = (() => {
    const boardStructured = new Array(9).fill(
      new Array(9).fill({ isInitial: false })
    );
    boardStructured[8][8] = {
      isInitial: true,
      value: 1,
    };

    return boardStructured;
  })();
  _boardSubject: Observable<ISudokuBoard> = new BehaviorSubject(
    this.defaultBoard
  );
  board$ = this._boardSubject;

  createBoardEasy = jest.fn();
  createBoardMedium = jest.fn();
  createBoardHard = jest.fn();
}

import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { ISudokuBoard } from '../sudoku.models';

import { getSuperSimpleBoardStructured } from '../../__mocks__/__utils__';
@Injectable()
export class SudokuFacade {
  readonly defaultBoard: ISudokuBoard = (() => {
    const boardStructured = getSuperSimpleBoardStructured();

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

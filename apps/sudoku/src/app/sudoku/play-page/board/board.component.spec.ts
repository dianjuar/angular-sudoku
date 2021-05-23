import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import * as sudokuUtils from '@sudoku/sudoku-utils';

import { ISudokuBoard, ISudokuSquare } from '../../+state/sudoku.models';
import { BoardComponent } from './board.component';

@Component({
  selector: 'sudoku-square',
  template: '{{ value }}',
})
class SquareStubComponent {
  @Input()
  disabled: boolean;

  @Input()
  value = '';
}

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  let sudokuBoardStr: string;
  let sudokuBoard: ISudokuBoard;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardComponent, SquareStubComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    sudokuBoardStr =
      '8.4.71.9.976.3....5.196....3.7495...692183...4.5726..92483591..169847...753612984';

    sudokuBoard = sudokuUtils.buildStructuredBoard<ISudokuSquare>(
      sudokuBoardStr,
      () => ({ isInitial: false }),
      (value) => ({ isInitial: true, value: parseInt(value) })
    );
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;

    component.board = sudokuBoard;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all the squared', () => {
    const totalSudokuSquares = 3 * 3 * 9;

    const hostElement = fixture.nativeElement as HTMLElement;
    const squares = hostElement.querySelectorAll('[data-test="square"]');

    expect(squares.length).toEqual(totalSudokuSquares);
  });

  it('should render the board correctly', () => {
    const hostElement = fixture.nativeElement as HTMLElement;
    const rows = hostElement.querySelectorAll('[data-test="board-row"]');
    const boardOnGrid = Array.from(rows).map((row) =>
      Array.from(row.querySelectorAll('[data-test="square"]'))
        .map((squareComp) => squareComp.innerHTML)
        .map((value) => (value === '' ? '.' : value))
    );

    expect(boardOnGrid).toEqual(sudokuUtils.stringToGrid(sudokuBoardStr));
  });
});

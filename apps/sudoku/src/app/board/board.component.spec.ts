import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { stringToGrid } from '@sudoku/sudoku-utils';

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardComponent, SquareStubComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
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

    expect(boardOnGrid).toEqual(stringToGrid(component.boardString));
  });

  // TODO test when disabled
  // TODO test value passed
});

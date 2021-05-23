import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ISudokuBoard } from '../+state/sudoku.models';
import { SudokuFacade } from '../+state/sudoku.facade';
import { SudokuFacade as SudokuFacadeMock } from '../+state/__mocks__/sudoku.facade';
jest.mock('../+state/sudoku.facade');

import { PlayPageComponent } from './play-page.component';
@Component({ selector: 'sudoku-board', template: '' })
class BoardStubComponent {
  @Input()
  board: ISudokuBoard;
}

describe('PlayPageComponent', () => {
  let component: PlayPageComponent;
  let boardComponent: BoardStubComponent;
  let fixture: ComponentFixture<PlayPageComponent>;

  let facadeMock: SudokuFacadeMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayPageComponent, BoardStubComponent],
      providers: [SudokuFacade],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    boardComponent = fixture.debugElement.query(
      By.directive(BoardStubComponent)
    ).componentInstance;
    facadeMock = (TestBed.inject(SudokuFacade) as unknown) as SudokuFacadeMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass the state board to board component', () => {
    expect(boardComponent.board).toBe(facadeMock.defaultBoard);
  });
});

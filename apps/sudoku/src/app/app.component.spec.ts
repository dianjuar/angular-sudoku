import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { SudokuFacade } from './sudoku/+state/sudoku.facade';
jest.mock('./sudoku/+state/sudoku.facade');

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatToolbarModule, RouterTestingModule],
      declarations: [AppComponent],
      providers: [SudokuFacade],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

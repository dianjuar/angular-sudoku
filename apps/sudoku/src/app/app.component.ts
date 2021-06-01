import { Component, OnInit } from '@angular/core';

import { SudokuFacade } from './sudoku/+state/sudoku.facade';

@Component({
  selector: 'sudoku-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private sudokuFacade: SudokuFacade) {}

  ngOnInit(): void {
    this.sudokuFacade.initApp();
  }
}

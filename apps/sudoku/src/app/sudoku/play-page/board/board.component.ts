import { Component, Input } from '@angular/core';

import { ISudokuBoard } from '../../+state/sudoku.models';

@Component({
  selector: 'sudoku-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input()
  board: ISudokuBoard;
}

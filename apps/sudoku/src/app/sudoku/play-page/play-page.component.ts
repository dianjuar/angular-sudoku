import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SudokuFacade } from '../+state/sudoku.facade';
import { ISudokuBoard } from '../+state/sudoku.models';

@Component({
  selector: 'sudoku-play-page',
  templateUrl: './play-page.component.html',
  styleUrls: ['./play-page.component.scss'],
})
export class PlayPageComponent {
  board$: Observable<ISudokuBoard>;

  constructor(private sudokuFacade: SudokuFacade) {
    this.board$ = sudokuFacade.board$;
  }
}

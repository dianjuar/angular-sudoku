import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SudokuFacade } from '../+state/sudoku.facade';

@Component({
  selector: 'sudoku-ask-difficulty',
  templateUrl: './ask-difficulty.component.html',
  styleUrls: ['./ask-difficulty.component.scss'],
})
export class AskDifficultyComponent {
  constructor(private sudokuFacade: SudokuFacade, private router: Router) {}

  levelSelected(level: 'easy' | 'medium' | 'hard') {
    switch (level) {
      case 'easy':
        this.sudokuFacade.createBoardEasy();

        break;
      case 'medium':
        this.sudokuFacade.createBoardMedium();

        break;
      case 'hard':
        this.sudokuFacade.createBoardHard();
        break;
    }

    this.router.navigateByUrl('/play');
  }
}

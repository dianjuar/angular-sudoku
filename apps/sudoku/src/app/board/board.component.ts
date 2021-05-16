import { Component } from '@angular/core';

@Component({
  selector: 'sudoku-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  readonly boardString =
    '52...6.........7.13...........4..8..6......5...........418.........3..2...87.....';

  boardArr: string[][];

  constructor() {
    const inChunks = (arr: string[], nChunks: number) =>
      arr.length
        ? [arr.slice(0, nChunks), ...inChunks(arr.slice(nChunks), nChunks)]
        : [];

    const withoutDots = this.boardString.split('');
    this.boardArr = inChunks(withoutDots, 9);
  }

  isDisabled(square: string): boolean {
    if (square === '.') {
      return false;
    }

    return true;
  }
}

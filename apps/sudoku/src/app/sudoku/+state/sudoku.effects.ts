import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as sudokuUtils from '@sudoku/sudoku-utils';

import { defer } from 'rxjs/internal/observable/defer';
import { concatMap } from 'rxjs/internal/operators/concatMap';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';

import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as SudokuActions from './sudoku.actions';

import { SudokuStorageService } from '../../core/services/sudoku-storage/sudoku-storage.service';
import { DifficultyLevels } from './sudoku.models';
import { EMPTY, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class SudokuEffects {
  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   *
   * The `defer` observable accepts an observable factory function
   * that is called when the observable is subscribed to.
   * Wrapping the supported call in `defer` makes
   * effect easier to test.
   */
  checkStorageSupport$ = createEffect(
    () => defer(() => this.sudokuStorage.supported()),
    { dispatch: false }
  );

  saveBoard$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SudokuActions.createStructuredBoard),
        concatMap(({ board }) => this.sudokuStorage.saveBoard(board))
      ),
    {
      dispatch: false,
    }
  );

  initApplication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SudokuActions.initApplication),
      concatMap(() =>
        this.sudokuStorage.getBoard().pipe(
          mergeMap((data) => {
            return data && data.length === 81 && /^([0-9]|\.)+$/.test(data)
              ? of(data)
              : (this.router.navigateByUrl(''), EMPTY);
          })
        )
      ),
      map((boardStr) =>
        SudokuActions.createStructuredBoard({ board: boardStr })
      ),
      tap(() => this.router.navigateByUrl('/play'))
    )
  );

  createBoardByDifficulty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SudokuActions.selectDifficulty),
      map(({ level }) => {
        let boardString: string;

        switch (level) {
          case DifficultyLevels.EASY:
            boardString = sudokuUtils.generateByDifficulty('easy');
            break;
          case DifficultyLevels.MEDIUM:
            boardString = sudokuUtils.generateByDifficulty('medium');
            break;
          case DifficultyLevels.HARD:
            boardString = sudokuUtils.generateByDifficulty('hard');
            break;
        }

        return SudokuActions.createStructuredBoard({ board: boardString });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private sudokuStorage: SudokuStorageService,
    private router: Router,
    private store: Store
  ) {}
}

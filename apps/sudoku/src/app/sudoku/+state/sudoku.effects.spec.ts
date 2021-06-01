import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { Observable } from 'rxjs';

import { SudokuStorageService } from '../../core/services/sudoku-storage/sudoku-storage.service';
import { SudokuStorageService as SudokuStorageServiceMock } from '../../core/services/sudoku-storage/__mocks__/sudoku-storage.service';
jest.mock('../../core/services/sudoku-storage/sudoku-storage.service');

import { SudokuEffects } from './sudoku.effects';
import * as Sudoku2Actions from './sudoku.actions';
import { routes } from '../sudoku-routing.module';
import { getSuperSimpleBoardStr } from '../__mocks__/__utils__';

describe('Sudoku2Effects', () => {
  let actions$: Observable<unknown>;
  let effects: SudokuEffects;

  let router: Router;
  let location: Location;
  let sudokuStorageServiceMock: SudokuStorageServiceMock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), RouterTestingModule.withRoutes(routes)],
      providers: [
        SudokuEffects,
        DataPersistence,
        provideMockActions(() => actions$),
        provideMockStore(),
      ],
    });
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    effects = TestBed.inject(SudokuEffects);
    sudokuStorageServiceMock = (TestBed.inject(
      SudokuStorageService
    ) as unknown) as SudokuStorageServiceMock;
  });

  beforeEach(() => {
    router.initialNavigation();
  });

  describe('initApplication$', () => {
    describe('With No Data on Storage', () => {
      beforeEach(async () => {
        await router.navigateByUrl('/play');

        sudokuStorageServiceMock.setShouldReturnEmptyBoard(true);

        actions$ = hot('-a-|', { a: Sudoku2Actions.initApplication() });
      });

      it('should do nothing', () => {
        const expected = hot('---|');

        expect(effects.initApplication$).toBeObservable(expected);
      });

      it('should do redirect to home', fakeAsync(() => {
        const expected = hot('---|');
        expect(effects.initApplication$).toBeObservable(expected);

        tick();
        expect(location.path()).toEqual('/');
      }));
    });

    describe('With Data on Storage', () => {
      beforeEach(async () => {
        sudokuStorageServiceMock.setShouldReturnEmptyBoard(false);

        actions$ = hot('-a-|', { a: Sudoku2Actions.initApplication() });
      });

      it('should trigger the action to create a board', () => {
        const expected = hot('-a-|', {
          a: Sudoku2Actions.createStructuredBoard({
            board: getSuperSimpleBoardStr(),
          }),
        });

        expect(effects.initApplication$).toBeObservable(expected);
      });

      it('should do redirect to the "/play"', fakeAsync(() => {
        const expected = hot('-a-|', {
          a: Sudoku2Actions.createStructuredBoard({
            board: getSuperSimpleBoardStr(),
          }),
        });

        expect(effects.initApplication$).toBeObservable(expected);

        tick();
        expect(location.path()).toEqual('/play');
      }));

      describe('storage is manipulated', () => {
        beforeEach(async () => {
          await router.navigateByUrl('/play');

          sudokuStorageServiceMock.setShouldReturnEmptyBoard(true);

          actions$ = hot('-a-|', { a: Sudoku2Actions.initApplication() });
        });

        it('should do nothing if the storage is manipulated', () => {
          sudokuStorageServiceMock.setCustomStoreData('.....1.');
          const expected = hot('---|');

          expect(effects.initApplication$).toBeObservable(expected);
        });

        it('should do redirect to home', fakeAsync(() => {
          const expected = hot('---|');
          expect(effects.initApplication$).toBeObservable(expected);

          tick();
          expect(location.path()).toEqual('/');
        }));
      });
    });
  });
});

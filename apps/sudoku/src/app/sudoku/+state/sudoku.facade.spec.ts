import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { DifficultyLevels } from './sudoku.models';
import { SudokuFacade } from './sudoku.facade';

import { SUDOKU_FEATURE_KEY, State, reducer } from './sudoku.reducer';

interface TestSchema {
  sudoku: State;
}

describe('SudokuFacade', () => {
  let facade: SudokuFacade;
  let store: Store<TestSchema>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(SUDOKU_FEATURE_KEY, reducer),
        EffectsModule.forFeature([]),
      ],
      providers: [SudokuFacade],
    })
    class CustomFeatureModule {}

    @NgModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        CustomFeatureModule,
      ],
    })
    class RootModule {}
    TestBed.configureTestingModule({ imports: [RootModule] });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    store = TestBed.inject(Store);
    facade = TestBed.inject(SudokuFacade);
  });

  describe('Create Board', () => {
    it('should set the level of difficulty easy', async (done) => {
      try {
        facade.createBoardEasy();

        const levelOfDifficulty = await readFirst(
          facade.selectedLevelOfDifficulty$
        );

        expect(levelOfDifficulty).toEqual(DifficultyLevels.EASY);
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('should set the level of difficulty medium', async (done) => {
      try {
        facade.createBoardMedium();

        const levelOfDifficulty = await readFirst(
          facade.selectedLevelOfDifficulty$
        );

        expect(levelOfDifficulty).toEqual(DifficultyLevels.MEDIUM);
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('should set the level of difficulty hard', async (done) => {
      try {
        facade.createBoardHard();

        const levelOfDifficulty = await readFirst(
          facade.selectedLevelOfDifficulty$
        );

        expect(levelOfDifficulty).toEqual(DifficultyLevels.HARD);
        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});

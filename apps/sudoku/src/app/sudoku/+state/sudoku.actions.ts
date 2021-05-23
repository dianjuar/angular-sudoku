import { createAction, props } from '@ngrx/store';

import { DifficultyLevels } from './sudoku.models';

export const selectDifficulty = createAction(
  '[SET DIFFICULTY]',
  props<{ level: DifficultyLevels }>()
);

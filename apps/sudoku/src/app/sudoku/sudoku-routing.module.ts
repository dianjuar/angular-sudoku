import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AskDifficultyComponent } from './ask-difficulty/ask-difficulty.component';
import { PlayPageComponent } from './play-page/play-page.component';

export const routes: Routes = [
  {
    path: '',
    component: AskDifficultyComponent,
  },
  {
    path: 'play',
    component: PlayPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SudokuRoutingModule {}

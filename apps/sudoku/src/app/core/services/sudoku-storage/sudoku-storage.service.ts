import { Inject, Injectable, InjectionToken } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map } from 'rxjs/internal/operators/map';

export function storageFactory() {
  return typeof window === undefined || typeof localStorage === undefined
    ? null
    : localStorage;
}

export const LOCAL_STORAGE_TOKEN = new InjectionToken('sudoku-local-storage', {
  factory: storageFactory,
});

@Injectable({
  providedIn: 'root',
})
export class SudokuStorageService {
  private collectionKey = 'sudoku-app';

  constructor(@Inject(LOCAL_STORAGE_TOKEN) private storage: Storage) {}

  supported(): Observable<boolean> {
    return this.storage !== null
      ? of(true)
      : throwError('Local Storage Not Supported');
  }

  getBoard(): Observable<string | null> {
    return this.supported().pipe(
      map(() => this.storage.getItem(this.collectionKey))
    );
  }

  saveBoard(boardStr: string): Observable<void> {
    return this.supported().pipe(
      map(() => this.storage.setItem(this.collectionKey, boardStr))
    );
  }
}

import { TestBed } from '@angular/core/testing';

import { SudokuStorageService } from './sudoku-storage.service';

describe('SudokuStorageService', () => {
  let service: SudokuStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SudokuStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

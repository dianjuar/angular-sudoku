import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuFacade } from '../+state/sudoku.facade';
import { SudokuFacade as SudokuFacadeMock } from '../+state/__mocks__/sudoku.facade';
jest.mock('../+state/sudoku.facade');
import { routes } from '../sudoku-routing.module';

import { AskDifficultyComponent } from './ask-difficulty.component';

describe('AskDifficultyComponent', () => {
  let component: AskDifficultyComponent;
  let fixture: ComponentFixture<AskDifficultyComponent>;

  let router: Router;
  let location: Location;
  let facadeMock: SudokuFacadeMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [AskDifficultyComponent],
      providers: [SudokuFacade],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    router.initialNavigation();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskDifficultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    facadeMock = (TestBed.inject(SudokuFacade) as unknown) as SudokuFacadeMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Level Selection', () => {
    const clickLevelButton = (level: 'easy' | 'medium' | 'hard') => {
      const hostElement = fixture.nativeElement as HTMLElement;
      const levelButton = hostElement.querySelector(
        `[data-test="${level}"]`
      ) as HTMLButtonElement;

      levelButton.click();
    };

    it('should create the easy board', () => {
      clickLevelButton('easy');

      expect(facadeMock.createBoardEasy).toHaveBeenCalled();
    });

    it('should create the medium board', () => {
      clickLevelButton('medium');

      expect(facadeMock.createBoardMedium).toHaveBeenCalled();
    });

    it('should create the hard board', () => {
      clickLevelButton('hard');

      expect(facadeMock.createBoardHard).toHaveBeenCalled();
    });

    it('should redirect after level selection', () => {
      clickLevelButton('medium');

      expect(location.path()).toEqual('/play');
    });
  });
});

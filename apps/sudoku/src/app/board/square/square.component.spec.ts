import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SquareComponent } from './square.component';

describe('SquareComponent', () => {
  let component: SquareComponent;
  let fixture: ComponentFixture<SquareComponent>;

  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [SquareComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    const hostElement = fixture.nativeElement as HTMLElement;
    inputElement = hostElement.querySelector('input');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Binding', () => {
    it('should bing disabled to the input', async () => {
      component.disabled = true;

      fixture.detectChanges();
      await fixture.whenStable();

      expect(inputElement.disabled).toBeTruthy();
    });

    it('should bing value to the input', async () => {
      const number = '1';
      component.value = number;

      fixture.detectChanges();
      await fixture.whenStable();

      expect(inputElement.value).toEqual(number);
    });

    it('should keep input and value attribute in sync', () => {
      const number = '1';
      inputElement.value = number;

      inputElement.dispatchEvent(new InputEvent('input'));

      expect(component.value).toEqual(number);
    });
  });

  describe('Input Validation', () => {
    // On successful keyDown launch the input event
    beforeEach(() => {
      const nativeElement = fixture.nativeElement as HTMLElement;
      nativeElement.addEventListener('keydown', (event: KeyboardEvent) => {
        inputElement.value = event.key;
        inputElement.dispatchEvent(new InputEvent('input'));
      });
    });

    it('should allow one number', () => {
      const number = '2';

      inputElement.dispatchEvent(
        new KeyboardEvent('keydown', { key: number, bubbles: true })
      );

      expect(component.value).toEqual(number);
    });

    it('should not allow two digit number', () => {
      const number1 = '4';
      const number2 = '6';

      inputElement.dispatchEvent(
        new KeyboardEvent('keydown', { key: number1, bubbles: true })
      );
      inputElement.dispatchEvent(
        new KeyboardEvent('keydown', { key: number2, bubbles: true })
      );

      expect(component.value).toEqual(number1);
    });

    it('should symbols', () => {
      const typed = '.';

      inputElement.dispatchEvent(
        new KeyboardEvent('keydown', { key: typed, bubbles: true })
      );
      fixture.detectChanges();

      expect(component.value).toEqual('');
    });
  });
});

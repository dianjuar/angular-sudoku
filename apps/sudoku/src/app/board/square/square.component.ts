import { Component, Input } from '@angular/core';

// import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'sudoku-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
})
export class SquareComponent {
  @Input()
  disabled: boolean;

  @Input()
  value = '';

  modelChangeFn(event: KeyboardEvent) {
    // If it's a letter or symbol block it
    if (/^[^1-9]$/.test(event.key)) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // If there is already a value and another number is coming, block it
    if (this.value.length === 1 && /^[1-9]$/.test(event.key)) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
  }
}

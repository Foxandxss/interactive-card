import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import {
  type AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  type ValidationErrors,
  type ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'card-card-feature-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div>
      <form [formGroup]="cardForm" (ngSubmit)="onsubmit()">
        <label for="cardName" class="block">CARDHOLDER NAME</label>
        <input placeholder="e.g. Jane Applessed" type="text" formControlName="cardName" required="true" />
        @if (cardForm.get('cardName')?.hasError('required')) {
          <div>Name is required</div>
        }
        @if (cardForm.get('cardName')?.hasError('pattern')) {
          <div>Name is invalid</div>
        }
        @if (cardForm.get('cardName')?.hasError('minlength')) {
          <div>Name is too short</div>
        }

        <label for="cardNumber" class="block">CARD NUMBER</label>
        <input placeholder="e.g. 1234 5678 9123 0000" type="text" formControlName="cardNumber" />
        @if (cardForm.get('cardNumber')?.hasError('pattern' || ('minlength' && 'maxlength'))) {
          <div>Card number is invalid</div>
        }

        <h3>EXP. DATE (MM/YY)</h3>
        <input placeholder="MM" type="text" formControlName="expDateM" minlength="2" maxlength="2" />
        @if (cardForm.get('expDateM')?.hasError('pattern' || 'minlength' || 'maxlength' || ('max' && 'min'))) {
          <div>Month is invalid</div>
        }

        <input placeholder="YY" type="text" formControlName="expDateY" minlength="2" maxlength="2" />
        @if (cardForm.get('expDateY')?.hasError('pattern' && 'minlength' && 'maxlength' && 'yearValidator')) {
          <div>Year is invalid</div>
        }
        <label for="cvv" class="block">CVC</label>
        <input placeholder="e.g. 123" type="text" formControlName="cvc" maxlength="3" />
        @if (cardForm.get('cvc')?.hasError('pattern' && 'minlength' && 'maxlength')) {
          <div>CVC is invalid</div>
        }
        <div>
          <button type="submit">Confirm</button>
        </div>
      </form>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFeatureFormComponent {
  readonly #formBuilder = inject(FormBuilder);

  readonly cardForm = this.#formBuilder.group({
    cardName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
    cardNumber: [
      '',
      [Validators.pattern('[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}'), Validators.minLength(16), Validators.maxLength(16)],
    ],
    expDateM: [
      '',
      [
        Validators.pattern('^(0[1-9]|1[0-2])$'),
        Validators.minLength(2),
        Validators.maxLength(2),
        Validators.max(12),
        Validators.min(1),
      ],
    ],
    expDateY: [
      '',
      [Validators.pattern('[0-9]{2}'), Validators.minLength(2), Validators.maxLength(2), this.yearValidator()],
    ],
    cvc: ['', [Validators.pattern('[0-9]{3}'), Validators.minLength(3), Validators.maxLength(3)]],
  });

  onsubmit() {
    console.log(this.cardForm.value);
  }

  yearValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const currentYear = new Date().getFullYear();
      const year = parseInt(value, 10) + 2000;
      if (year < currentYear || year > currentYear + 5 || year === currentYear) {
        return { yearValidator: true };
      }
      return null;
    };
  }
}

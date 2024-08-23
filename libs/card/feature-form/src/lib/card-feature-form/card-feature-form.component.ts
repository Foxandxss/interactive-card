/* eslint-disable no-useless-escape */
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
        @if (c.cardName.errors?.['pattern']) {
          <div>Name can't use number</div>
        }
        @if (c.cardName.errors?.['minlength']) {
          <div>Name too short</div>
        }
        @if (c.cardName.touched && c.cardName.invalid) {
          <div>Must insert name</div>
        }

        <label for="cardNumber" class="block">CARD NUMBER</label>
        <input placeholder="e.g. 1234 5678 9123 0000" type="text" formControlName="cardNumber" />
        @if (c.cardNumber.errors?.['pattern']) {
          <div>Card number is invalid</div>
        }

        <h3>EXP. DATE (MM/YY)</h3>
        <input placeholder="MM" type="text" formControlName="expDateM" minlength="2" maxlength="2" />
        @if (c.expDateM.errors) {
          <div>Month is invalid</div>
        }

        <input placeholder="YY" type="text" formControlName="expDateY" minlength="2" maxlength="2" />
        @if (c.expDateY.errors) {
          <div>Year is invalid</div>
        }
        <label for="cvv" class="block">CVC</label>
        <input placeholder="e.g. 123" type="text" formControlName="cvc" maxlength="3" />
        @if (c.cvc.errors) {
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
      [Validators.pattern(/^(\d{4}[ -]?){3}\d{4}$/), Validators.minLength(16), Validators.maxLength(19)],
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
    if (!this.cardForm.valid) {
      console.log('Errors', this.cardForm.errors);
    }
    console.log('Forms Valid', this.cardForm.value);
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

  get c() {
    return this.cardForm.controls;
  }
}

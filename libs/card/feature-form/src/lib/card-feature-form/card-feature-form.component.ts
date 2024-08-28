import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, type OnInit, ViewEncapsulation, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FormStateService } from '@card/shared-util-form';
import { YearValidator } from '@card/shared-util-validators';

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
          <div class="text-red-500">Name can't use number</div>
        }
        @if (c.cardName.errors?.['minlength']) {
          <div class="text-red-500">Name too short</div>
        }
        @if (c.cardName.touched && c.cardName.invalid) {
          <div class="text-red-500">Must insert name</div>
        }

        <label for="cardNumber" class="block">CARD NUMBER</label>
        <input placeholder="e.g. 1234 5678 9123 0000" type="text" formControlName="cardNumber" />
        @if (c.cardNumber.errors?.['pattern']) {
          <div class="text-red-500">Card number is invalid</div>
        }

        @if (c.cardNumber.touched && c.cardNumber.invalid) {
          <div class="text-red-500">Insert Card Number</div>
        }

        <h3>EXP. DATE (MM/YY)</h3>
        <input placeholder="MM" type="text" formControlName="expDateM" minlength="2" maxlength="2" />
        @if (c.expDateM.errors?.['pattern']) {
          <div class="text-red-500">Month is invalid</div>
        }
        @if (c.expDateM.touched && c.expDateM.invalid) {
          <div class="text-red-500">Insert Month</div>
        }

        <input placeholder="YY" type="text" formControlName="expDateY" minlength="2" maxlength="2" />
        @if (c.expDateY.errors?.['pattern']) {
          <div class="text-red-500">Year is invalid</div>
        }
        @if (c.expDateY.touched && c.expDateY.invalid) {
          <div class="text-red-500">Insert Year</div>
        }

        <label for="cvc" class="block">CVC</label>
        <input placeholder="e.g. 123" type="text" formControlName="cvc" maxlength="3" minlength="3" />
        @if (c.cvc.errors?.['pattern']) {
          <div class="text-red-500">CVC is invalid</div>
        }
        @if (c.cvc.touched && c.cvc.invalid) {
          <div class="text-red-500">Insert CVC</div>
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
export class CardFeatureFormComponent implements OnInit {
  readonly #router = inject(Router);
  readonly #formBuilder = inject(FormBuilder);
  readonly #cardFormStateService = inject(FormStateService);
  readonly #destroyRef = inject(DestroyRef);

  readonly cardForm = this.#formBuilder.group({
    cardName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
    cardNumber: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(\d{4}[ -]?){3}\d{4}$/),
        Validators.minLength(16),
        Validators.maxLength(19),
      ],
    ],
    expDateM: [
      '',
      [
        Validators.required,
        Validators.pattern('^(0[1-9]|1[0-2])$'),
        Validators.minLength(2),
        Validators.maxLength(2),
        Validators.max(12),
        Validators.min(1),
      ],
    ],
    expDateY: ['', [Validators.pattern('[0-9]{2}'), Validators.minLength(2), Validators.maxLength(2), YearValidator()]],
    cvc: ['', [Validators.pattern('[0-9]{3}'), Validators.minLength(3), Validators.maxLength(3)]],
  });

  ngOnInit(): void {
    this.#cardFormStateService.setFormState(this.cardForm);

    this.cardForm.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(() => {
      this.#cardFormStateService.setFormState(this.cardForm);
    });
  }

  onsubmit() {
    if (!this.cardForm.valid) {
      this.cardForm.markAllAsTouched();

      Object.values(this.cardForm.controls).forEach((control) => {
        control.markAsDirty();
      });
      return;
    }
    this.#router.navigate(['/confirm']);
  }

  get c() {
    return this.cardForm.controls;
  }
}

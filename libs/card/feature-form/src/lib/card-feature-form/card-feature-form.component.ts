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
    <form [formGroup]="cardForm" (ngSubmit)="onsubmit()">
      <div class="flex flex-col gap-10">
        <div>
          <label for="cardName" class="mb-2 block">CARDHOLDER NAME</label>
          <div
            class="rounded-lg bg-border p-px focus-within:bg-gradient-to-b focus-within:from-border-initial focus-within:to-border-end"
          >
            <input
              placeholder="e.g. Jane Applessed"
              id="cardName"
              type="text"
              formControlName="cardName"
              required="true"
              class="w-full rounded-[calc(0.5rem-1px)] border-none px-4 py-2 outline-none"
            />
          </div>
          @if (c.cardName.errors?.['pattern']) {
            <div class="mt-1 text-sm text-error">Name can't use number</div>
          } @else if (c.cardName.errors?.['minlength']) {
            <div class="mt-1 text-sm text-error">Name too short</div>
          } @else if (c.cardName.touched && c.cardName.invalid) {
            <div class="mt-1 text-sm text-error">Can't be blank</div>
          }
        </div>
        <div>
          <label for="cardNumber" class="mb-2 block">CARD NUMBER</label>
          <div
            class="rounded-lg bg-border p-px focus-within:bg-gradient-to-b focus-within:from-border-initial focus-within:to-border-end"
          >
            <input
              placeholder="e.g. 1234 5678 9123 0000"
              id="cardNumber"
              type="text"
              formControlName="cardNumber"
              class="w-full rounded-[calc(0.5rem-1px)] border-none px-4 py-2 outline-none"
            />
          </div>
          @if (c.cardNumber.errors?.['pattern']) {
            <div class="mt-1 text-sm text-error">Card number is invalid</div>
          } @else if (c.cardNumber.touched && c.cardNumber.invalid) {
            <div class="mt-1 text-sm text-error">Insert Card Number</div>
          }
        </div>
        <div class="flex gap-4">
          <div>
            <label for="expDateM" class="mb-2 block">EXP. DATE (MM/YY)</label>
            <div class="flex gap-[10px]">
              <div>
                <div
                  class="rounded-lg bg-border p-px focus-within:bg-gradient-to-b focus-within:from-border-initial focus-within:to-border-end"
                >
                  <input
                    placeholder="MM"
                    id="expDateM"
                    type="text"
                    formControlName="expDateM"
                    minlength="2"
                    maxlength="2"
                    class="w-full rounded-[calc(0.5rem-1px)] border-none px-4 py-2 outline-none"
                  />
                </div>
                @if (c.expDateM.errors?.['pattern']) {
                  <div class="mt-1 text-sm text-error">Month is invalid</div>
                } @else if (c.expDateM.touched && c.expDateM.invalid) {
                  <div class="mt-1 text-sm text-error">Can't be blank</div>
                }
              </div>
              <div>
                <div
                  class="rounded-lg bg-border p-px focus-within:bg-gradient-to-b focus-within:from-border-initial focus-within:to-border-end"
                >
                  <input
                    placeholder="YY"
                    type="text"
                    formControlName="expDateY"
                    minlength="2"
                    maxlength="2"
                    class="w-full rounded-[calc(0.5rem-1px)] border-none px-4 py-2 outline-none"
                  />
                </div>
                @if (c.expDateY.errors?.['pattern']) {
                  <div class="mt-1 text-sm text-error">Year is invalid</div>
                } @else if (c.expDateY.errors?.['yearValidator']) {
                  <div class="mt-1 text-sm text-error">Year is in the past or too far</div>
                } @else if (c.expDateY.touched && c.expDateY.invalid) {
                  <div class="mt-1 text-sm text-error">Can't be blank</div>
                }
              </div>
            </div>
          </div>

          <div>
            <label for="cvc" class="mb-2 block">CVC</label>
            <div
              class="rounded-lg bg-border p-px focus-within:bg-gradient-to-b focus-within:from-border-initial focus-within:to-border-end"
            >
              <input
                placeholder="e.g. 123"
                id="cvc"
                type="text"
                formControlName="cvc"
                maxlength="3"
                minlength="3"
                class="w-full rounded-[calc(0.5rem-1px)] border-none px-4 py-2 outline-none"
              />
            </div>
            @if (c.cvc.errors?.['pattern']) {
              <div class="mt-1 text-sm text-error">CVC is invalid</div>
            } @else if (c.cvc.touched && c.cvc.invalid) {
              <div class="mt-1 text-sm text-error">Can't be blank</div>
            }
          </div>
        </div>
        <div>
          <button type="submit" class="h-14 w-full rounded-lg bg-dark-violet text-white">Confirm</button>
        </div>
      </div>
    </form>
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
    expDateY: [
      '',
      [
        Validators.required,
        YearValidator(),
        Validators.pattern('[0-9]{2}'),
        Validators.minLength(2),
        Validators.maxLength(2),
      ],
    ],
    cvc: ['', [Validators.required, Validators.pattern('[0-9]{3}'), Validators.minLength(3), Validators.maxLength(3)]],
  });

  ngOnInit(): void {
    // TEMP
    this.cardForm.patchValue({
      cardName: 'Jane Applessed',
      cardNumber: '1234 5678 9123 0000',
      expDateM: '12',
      expDateY: '26',
      cvc: '123',
    });

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

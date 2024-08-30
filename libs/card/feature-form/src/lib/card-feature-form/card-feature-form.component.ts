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
          <label for="cardName" class="mb-2 block text-[12px] tracking-[2px]">CARDHOLDER NAME</label>
          <div
            class="focus-within:from-border-initial focus-within:to-border-end rounded-lg bg-border p-px focus-within:bg-gradient-to-b"
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
            <div class="text-error mt-1 text-sm">Name can't use number</div>
          } @else if (c.cardName.errors?.['minlength']) {
            <div class="text-error mt-1 text-sm">Name too short</div>
          } @else if (c.cardName.touched && c.cardName.invalid) {
            <div class="text-error mt-1 text-sm">Can't be blank</div>
          }
        </div>
        <div>
          <label for="cardNumber" class="mb-2 block text-[12px] tracking-[2px]">CARD NUMBER</label>
          <div
            class="focus-within:from-border-initial focus-within:to-border-end rounded-lg bg-border p-px focus-within:bg-gradient-to-b"
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
            <div class="text-error mt-1 text-sm">Card number is invalid</div>
          } @else if (c.cardNumber.touched && c.cardNumber.invalid) {
            <div class="text-error mt-1 text-sm">Insert Card Number</div>
          }
        </div>
        <div class="flex gap-4">
          <div>
            <label for="expDateM" class="mb-2 block text-[12px] tracking-[2px]">EXP. DATE (MM/YY)</label>
            <div class="flex gap-[10px]">
              <div>
                <div
                  class="focus-within:from-border-initial focus-within:to-border-end rounded-lg bg-border p-px focus-within:bg-gradient-to-b"
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
                  <div class="text-error mt-1 text-sm">Month is invalid</div>
                } @else if (c.expDateM.touched && c.expDateM.invalid) {
                  <div class="text-error mt-1 text-sm">Can't be blank</div>
                }
              </div>
              <div>
                <div
                  class="focus-within:from-border-initial focus-within:to-border-end rounded-lg bg-border p-px focus-within:bg-gradient-to-b"
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
                  <div class="text-error mt-1 text-sm">Year is invalid</div>
                } @else if (c.expDateY.errors?.['yearValidator']) {
                  <div class="text-error mt-1 text-sm">Year is in the past or too far</div>
                } @else if (c.expDateY.touched && c.expDateY.invalid) {
                  <div class="text-error mt-1 text-sm">Can't be blank</div>
                }
              </div>
            </div>
          </div>

          <div>
            <label for="cvc" class="mb-2 block text-[12px] tracking-[2px]">CVC</label>
            <div
              class="focus-within:from-border-initial focus-within:to-border-end rounded-lg bg-border p-px focus-within:bg-gradient-to-b"
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
              <div class="text-error mt-1 text-sm">CVC is invalid</div>
            } @else if (c.cvc.touched && c.cvc.invalid) {
              <div class="text-error mt-1 text-sm">Can't be blank</div>
            }
          </div>
        </div>
        <div>
          <button type="submit" class="bg-dark-violet h-14 w-full rounded-lg text-white">Confirm</button>
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

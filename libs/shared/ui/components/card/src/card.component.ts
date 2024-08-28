import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { FormStateService } from '@card/shared-util-form';

@Component({
  standalone: true,
  selector: 'ui-card',
  imports: [AsyncPipe],
  template: `
    @let form = formState$ | async;

    <div class="relative">
      <img src="images/bg-card-front.png" class="h-auto w-full" />
      @if (form) {
        <div class="lef-10 absolute top-10 text-white">
          <div class="card__number">{{ form.value.cardNumber }}</div>
          <div class="card__name">{{ form.value.cardName }}</div>
          <div class="card__exp=">{{ form.value.expDateM }} / {{ form.value.expDateY }}</div>
        </div>
      }
    </div>
    <div class="relative">
      <img src="images/bg-card-back.png" class="h-auto w-full" />
      @if (form) {
        <div class="absolute top-10 text-white">
          <div class="card__cvc">{{ form.value.cvc }}</div>
        </div>
      }
    </div>
  `,

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  readonly #cardFormStateService = inject(FormStateService);
  formState$ = this.#cardFormStateService.formState$;
}

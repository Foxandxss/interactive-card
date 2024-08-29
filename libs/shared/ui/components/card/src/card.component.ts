import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { CreditCardFormatPipe } from '@card/shared-ui-pipes/credit-card';
import { FormStateService } from '@card/shared-util-form';

@Component({
  standalone: true,
  selector: 'ui-card',
  imports: [AsyncPipe, CreditCardFormatPipe, UpperCasePipe],
  template: `
    @let form = formState$ | async;

    @if (form) {
      <div>
        <div
          class="flex h-[245px] w-[447px] flex-col justify-between bg-[url('/images/bg-card-front.png')] bg-no-repeat p-8 text-white"
        >
          <div class="flex items-center gap-2">
            <div class="h-12 w-12 rounded-full bg-white"></div>
            <div class="h-6 w-6 rounded-full border border-white bg-transparent"></div>
          </div>
          <div>
            <div class="mb-4 text-[28px] tracking-[3.42px]">{{ form.value.cardNumber | creditCardFormat }}</div>
            <div class="flex justify-between text-sm">
              <div>{{ form.value.cardName | uppercase }}</div>
              <div>{{ form.value.expDateM }} / {{ form.value.expDateY }}</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="relative ml-24 mt-8 h-[245px] w-[447px] bg-[url('/images/bg-card-back.png')] bg-no-repeat">
          <div class="absolute right-[3.4rem] top-[6.7rem] text-white">{{ form.value.cvc }}</div>
        </div>
      </div>
    }
  `,

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  readonly #cardFormStateService = inject(FormStateService);
  formState$ = this.#cardFormStateService.formState$;
}

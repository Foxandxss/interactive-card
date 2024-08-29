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
      <div class="relative ml-6 mt-10 md:m-0">
        <div class="md:h-[245px] md:w-[447px]">
          <img src="/images/bg-card-front.png" alt="card-front" class="h-[156px] w-[285px] md:size-full" />
          <div class="absolute left-4 top-4 flex flex-col justify-between text-white md:left-8 md:top-8">
            <div class="mb-8 flex items-center gap-2 md:mb-12">
              <div class="size-8 rounded-full bg-white md:size-12"></div>
              <div class="size-4 rounded-full border border-white bg-transparent md:size-6"></div>
            </div>
            <div>
              <div class="mb-4 text-[18px] tracking-[3.42px] md:mb-6 md:text-[28px]">
                {{ form.value.cardNumber | creditCardFormat }}
              </div>
              <div class="flex justify-between">
                <div class="text-[9px] md:text-[14px]">{{ form.value.cardName | uppercase }}</div>
                <div class="text-[9px] md:text-[14px]">{{ form.value.expDateM }} / {{ form.value.expDateY }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="relative h-[156px] w-[285px] md:ml-24 md:mt-8 md:h-[245px] md:w-[447px]">
          <img src="/images/bg-card-back.png" alt="card-back" class="h-[156px] w-[285px] md:size-full" />
          <div class="absolute right-[2.2rem] top-[4.3rem] text-white md:right-[3.2rem] md:top-[6.9rem]">
            <div class="text-[9px] tracking-[1.29px] md:text-[14px] md:tracking-[2px]">{{ form.value.cvc }}</div>
          </div>
        </div>
        <!-- <div
          class="absolute flex max-h-[245px] max-w-[447px] flex-col justify-between bg-[url('/images/bg-card-front.png')] bg-cover bg-center bg-no-repeat p-8 text-white md:h-[245px] md:w-[447px]"
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
        </div> -->
        <!-- <div class="relative h-[245px] w-[447px] bg-[url('/images/bg-card-back.png')] bg-no-repeat md:ml-24 md:mt-8">
        <div class="absolute right-[3.4rem] top-[6.7rem] text-white">{{ form.value.cvc }}</div>
      </div> -->
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

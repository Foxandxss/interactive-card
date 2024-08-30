import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { CreditCardFormatPipe } from '@card/shared-ui-pipes/credit-card';
import { faker } from '@card/shared-util-faker';
import { FormStateService } from '@card/shared-util-form';

@Component({
  standalone: true,
  selector: 'ui-card',
  imports: [AsyncPipe, CreditCardFormatPipe, UpperCasePipe],
  template: `
    @let form = formState$ | async;

    @if (form) {
      <div class="absolute ml-4 mt-10 flex flex-col md:relative md:m-0">
        <div class="relative top-[-4.3rem] order-2 md:static md:order-1 md:h-[245px] md:w-[447px]">
          <img src="/images/bg-card-front.png" alt="card-front" class="h-[156px] w-[285px] md:size-full" />
          <div class="absolute left-4 top-4 flex flex-col justify-between text-white md:left-8 md:right-20 md:top-8">
            <div class="mb-8 flex items-center gap-2 md:mb-12">
              <!-- <div class="size-8 rounded-full bg-white md:size-12"></div> -->
              <img alt="user" class="h-8 w-8 rounded-full md:h-12 md:w-12" [src]="image" />
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
        <div class="md:ml-18 relative order-1 ml-12 h-[156px] w-[285px] md:order-2 md:mt-8 md:h-[245px] md:w-[447px]">
          <img src="/images/bg-card-back.png" alt="card-back" class="h-[156px] w-[285px] md:size-full" />
          <div class="absolute right-[2.2rem] top-[4.3rem] text-white md:right-[3.2rem] md:top-[6.9rem]">
            <div class="text-[9px] tracking-[1.29px] md:text-[14px] md:tracking-[2px]">{{ form.value.cvc }}</div>
          </div>
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

  image = faker.image.url();
}

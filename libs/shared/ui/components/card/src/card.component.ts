import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { FormStateService } from '@card/shared-util-form';

@Component({
  standalone: true,
  selector: 'ui-card',
  imports: [AsyncPipe],
  template: `
    @let form = formState$ | async;

    @if (form) {
      <div class="card">
        <div class="card__number">{{ form.value.cardNumber }}</div>
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

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'card-card-feature-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div>
      <form [formGroup]="cardForm">
        <input placeholder="Card Name" pattern="[a-zA-Z ]" type="text" formControlName="cardName" />
        <input placeholder="Card Number" type="text" formControlName="cardNumber" />

        <h3>Expiration Date (MM/YY)</h3>
        <input placeholder="MM" type="text" formControlName="expDateM" />
        <input placeholder="YY" type="text" formControlName="expDateY" />
        <input placeholder="CVV" type="text" formControlName="cvv" />
        <button type="submit">Confirm</button>
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
    cardName: new FormControl('', Validators.pattern('[a-zA-Z ]')),
    cardNumber: new FormControl('', Validators.pattern('[0-9]{16}')),
    expDateM: new FormControl('', Validators.pattern('[0-9]{2}')),
    expDateY: new FormControl('', Validators.pattern('[0-9]{2}')),
    cvv: new FormControl('', Validators.pattern('[0-9]{3}')),
  });
}

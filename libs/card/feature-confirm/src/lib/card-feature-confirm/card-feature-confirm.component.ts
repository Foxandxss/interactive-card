import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-card-feature-confirm',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="flex flex-col">
      <img src="images/icon-complete.svg" alt="Confirmation Icon" class="mb-6 size-16" />
      <h1 class="flex">THANK YOU!</h1>
      <p class="mb-6 text-center text-gray-500">We've added your card details</p>
      <button>Continue</button>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFeatureConfirmComponent {}

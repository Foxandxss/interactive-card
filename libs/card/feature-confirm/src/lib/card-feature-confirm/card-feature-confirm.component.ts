import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-card-feature-confirm',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="flex flex-col items-center gap-6">
      <img src="images/icon-complete.svg" alt="Confirmation Icon" />
      <h1 class="text-2xl tracking-widest">THANK YOU!</h1>
      <p class="text-gray-400">We've added your card details</p>
      <button class="h-14 w-[327px] rounded-lg bg-dark-violet text-white md:min-w-[380px]">Continue</button>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFeatureConfirmComponent {}

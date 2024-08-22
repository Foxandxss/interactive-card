import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'card-feature-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="flex h-screen">
      <div class="relative flex h-full w-1/2">
        <div class="h-full w-2/3 bg-[url('../../public/images/bg-main-desktop.png')] bg-cover bg-center"></div>
        <div class="relative z-10">
          <div class="mb-6">
            <img src="../../public/images/bg-card-front.png" alt="Front of Credit Card" class="w-full rounded-lg" />
          </div>
          <div class="p-4">
            <img src="../../public/images/bg-card-back.png" alt="Back of Credit Card" class="w-full rounded-lg" />
          </div>
          <div class="h-full w-1/3"></div>
        </div>
        <div class="h-full w-1/2">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFeatureShellComponent {}

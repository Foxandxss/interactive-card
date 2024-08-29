import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CardComponent } from '@card/shared-ui-components/card';

@Component({
  selector: 'card-feature-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CardComponent],
  template: `
    <div class="flex h-full">
      <div class="relative flex flex-1 items-center justify-center">
        <div
          style="clip-path: inset(0 50% 0 0);"
          class="absolute left-0 top-0 h-full w-full bg-[url('/images/bg-main-desktop.png')] bg-cover bg-no-repeat"
        ></div>
        <div class="relative z-10">
          <ui-card />
        </div>
      </div>
      <div class="flex flex-1 items-center justify-center p-6">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFeatureShellComponent {}

// flex basis-1/2 items-center justify-center bg-[url('/images/bg-main-desktop.png')] bg-cover bg-no-repeat

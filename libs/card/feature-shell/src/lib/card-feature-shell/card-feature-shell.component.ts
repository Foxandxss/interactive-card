import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CardComponent } from '@card/shared-ui-components/card';

@Component({
  selector: 'card-feature-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CardComponent],
  template: `
    <div class="flex h-full flex-col md:flex-row">
      <div class="relative flex min-h-60 items-center justify-center md:flex-1">
        <!-- Background desktop -->
        <div
          style="clip-path: inset(0 50% 0 0);"
          class="absolute left-0 top-0 hidden h-full w-full bg-[url('/images/bg-main-desktop.png')] bg-cover bg-no-repeat md:block"
        ></div>

        <!-- Background mobile -->
        <div
          class="absolute left-0 top-0 block h-full w-full bg-[url('/images/bg-main-desktop.png')] bg-cover bg-no-repeat md:hidden"
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

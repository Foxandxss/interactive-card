import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CardComponent } from '@card/shared-ui-components/card';

@Component({
  selector: 'card-feature-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CardComponent],
  template: `
    <div class="flex h-screen">
      <div class="relative flex h-full w-1/2">
        <div class="h-full w-2/3 bg-[url('../../public/images/bg-main-desktop.png')] bg-cover bg-center"></div>
        <ui-card />
        <div class="h-full w-1/3"></div>
      </div>
      <div class="h-full w-1/2">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFeatureShellComponent {}

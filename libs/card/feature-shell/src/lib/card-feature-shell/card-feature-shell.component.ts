import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CardComponent } from '@card/shared-ui-components/card';

@Component({
  selector: 'card-feature-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CardComponent],
  template: `
    <div class="flex">
      <div class="basis-1/2">
        <ui-card />
      </div>
      <div class="flex basis-1/2 items-center justify-center p-6">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFeatureShellComponent {}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'card-card-feature-form',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>card-feature-form works!</p>
    <div class="container flex h-screen">
      <div class="size-full bg-red-500"></div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFeatureFormComponent {}

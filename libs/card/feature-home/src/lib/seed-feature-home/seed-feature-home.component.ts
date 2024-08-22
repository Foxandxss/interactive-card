import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'card-card-feature-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>card-feature-home works!</p>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class cardFeatureHomeComponent {}

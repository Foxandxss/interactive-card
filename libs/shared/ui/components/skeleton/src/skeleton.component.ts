import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, input } from '@angular/core';

import { cn } from '@card/shared-ui-core/cn';

@Component({
  standalone: true,
  selector: 'ui-skeleton',
  template: `
    <ng-content />
  `,
  host: { '[class': 'computedClass()' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent {
  readonly class = input('');
  readonly computedClass = computed(() => cn('block', 'animate-pulse rounded-md bg-muted', this.class()));
}

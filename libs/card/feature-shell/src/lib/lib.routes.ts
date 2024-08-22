import { type Route } from '@angular/router';

import { CardFeatureShellComponent } from './card-feature-shell/card-feature-shell.component';

const children: Route[] = [
  {
    path: '',
    loadChildren: () => import('@card/card-feature-form').then((m) => m.cardFeatureFormRoutes),
  },
];

export const cardFeatureShellRoutes: Route[] = [{ path: '', component: CardFeatureShellComponent, children }];

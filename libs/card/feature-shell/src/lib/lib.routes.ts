import { type Route } from '@angular/router';

import { CardFeatureShellComponent } from './card-feature-shell/card-feature-shell.component';

const children: Route[] = [
  {
    path: '',
    loadChildren: () => import('@card/card-feature-form').then((m) => m.cardFeatureFormRoutes),
  },
  {
    path: 'confirm',
    loadChildren: () => import('@card/card-feature-confirm').then((m) => m.cardFeatureConfirmRoutes),
  },
];

export const cardFeatureShellRoutes: Route[] = [{ path: '', component: CardFeatureShellComponent, children }];

import { type Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@card/card-feature-shell').then((m) => m.cardFeatureShellRoutes),
  },
];

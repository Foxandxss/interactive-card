import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { type Type } from '@angular/core';
import { type RenderComponentOptions, render } from '@testing-library/angular';

import { provideDataAccessApi } from '@card/shared-data-access-api';

export const renderWithApi = <ComponentType>(
  component: Type<ComponentType>,
  renderOptions: RenderComponentOptions<ComponentType> = {},
) => {
  return render(component, {
    ...renderOptions,
    providers: [
      provideHttpClient(withInterceptorsFromDi()),
      provideDataAccessApi(),
      ...(renderOptions.providers ?? []),
    ],
  });
};

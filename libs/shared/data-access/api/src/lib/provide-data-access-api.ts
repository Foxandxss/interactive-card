import { type EnvironmentProviders } from '@angular/core';
import { provideStoreApi } from 'ngrx-rtk-query';
import { api } from './api/api';

export function provideDataAccessApi(): EnvironmentProviders {
  return provideStoreApi(api);
}

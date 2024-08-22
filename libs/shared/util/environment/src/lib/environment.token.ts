import {
  inject,
  InjectionToken,
  Injector,
  makeEnvironmentProviders,
} from '@angular/core';
import { type Environment } from './environment.model';

export const ENVIRONMENT = new InjectionToken<Environment>('ENVIRONMENT');

export function provideEnvironment(environment: Environment) {
  return makeEnvironmentProviders([
    { provide: ENVIRONMENT, useValue: environment },
  ]);
}

export function injectEnvironment({ injector = inject(Injector) } = {}) {
  return injector.get(ENVIRONMENT);
}

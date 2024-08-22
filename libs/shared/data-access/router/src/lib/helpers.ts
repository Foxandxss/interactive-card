import { computed } from '@angular/core';
import { injectParams } from './inject-params';

export const injectParamId = injectParams('id');

export const injectParamIdNumber = () => {
  const id = injectParams('id');
  return computed(() => {
    const numberId = Number(id());
    return !numberId || isNaN(numberId) ? undefined : numberId;
  });
};

import { setupWorker } from 'msw/browser';

import { type Environment } from '@card/shared-util-environment';

const onBootstrapAppInit = async () => {
  const worker = setupWorker();

  await worker.start({ onUnhandledRequest: 'bypass' });
};

export const environment: Environment = {
  baseAPI: '',
  onBootstrapAppInit,
};

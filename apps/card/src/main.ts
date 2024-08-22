import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';

const onBootstrapAppInit = environment.onBootstrapAppInit?.() ?? Promise.resolve();

onBootstrapAppInit.then(() => {
  bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
});

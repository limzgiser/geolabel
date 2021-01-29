import { enableProdMode, NgZone } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';

 
let lifecycles :any;
let bootstrap: any;
let mount: any;
let unmount: any;

if (environment.production) {
  enableProdMode();
}
if (!!(window as any).__POWERED_BY_QIANKUN__) {
    lifecycles = singleSpaAngular({
    bootstrapFunction: singleSpaProps => {
      singleSpaPropsSubject.next(singleSpaProps);
      return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(AppModule);
    },
    template: '<app-root />',
    Router,
    NgZone: NgZone,
  });
  bootstrap = lifecycles.bootstrap;
  mount = lifecycles.mount;
  unmount = lifecycles.unmount;
} else {
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
}

 
export { bootstrap, mount, unmount };

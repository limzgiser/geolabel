
import { CityfunModule } from './cityfun/cityfun.module';
import { Layout01Component } from './layout/layout01/layout01.component';

import { LayoutRoutesModule } from './routes/routes.module';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultInterceptor } from './shared/services/default.interceptor';
import { CoreModule, StartupService, ResourceMetaInfoService } from '@cmss/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MapboxmapService } from './cityfun/mapbox-map/service/mapboxmap.service';
export function StartupServiceFactory(startupService: StartupService) {
  return () =>
    startupService.loadRootConfig('./assets/config/root.config.json');
}

@NgModule({
  declarations: [
    AppComponent,
    Layout01Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutRoutesModule,
    CoreModule,
    CityfunModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    MapboxmapService,
    ResourceMetaInfoService,
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: StartupServiceFactory,
      deps: [StartupService],
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
  ]
})
export class AppModule { }

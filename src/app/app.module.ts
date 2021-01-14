
import { CityfunModule } from './cityfun/cityfun.module';
import { Layout01Component } from './layout/layout01/layout01.component';

import { LayoutRoutesModule } from './routes/routes.module';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuConfigService } from './services/menu.config.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CfhttpService } from './services/cfhttp.service';
import { MapboxmapService } from './cityfun/mapbox-map/service/mapboxmap.service';
import {InterceptorService} from "./services/interceptor.service";
import {MainConfigService} from "./services/main.config.service";


@NgModule({
  declarations: [
    AppComponent,
    Layout01Component,
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutRoutesModule,
    CityfunModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    MapboxmapService,
    MainConfigService,
    MenuConfigService,
    CfhttpService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ]
})
export class AppModule { }

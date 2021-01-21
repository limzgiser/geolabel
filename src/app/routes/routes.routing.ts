import { AuthGuard } from '../shared/services/auth.guard';
import { Layout01Component } from '../layout/layout01/layout01.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {MainConfigService} from "../services/main.config.service";
import { APP_BASE_HREF } from '@angular/common';
import { MapConfigService } from '../services/map-config.service';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    resolve: {
      maincfg: MainConfigService,
    },
    loadChildren: () =>
      import('../cityfun/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'layout',
    component: Layout01Component,
    // resolve: {
    //   maincfg: MainConfigService,
    // },
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'geolabel', pathMatch: 'full' },
      {
        path: 'geolabel',
        resolve: {
          mapboxConfig: MapConfigService,
        },
        loadChildren: () =>  import('../business/geo-label/geo-label.module').then( m => m.GeoLabelModule  ),
      },
    ],
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
      
    }),
  ],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: window['__POWERED_BY_QIANKUN__'] ? '/geolabel' : '/' }]
})
export class RouteRoutingModule {}

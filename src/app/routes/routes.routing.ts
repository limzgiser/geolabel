import { AuthGuard } from '../shared/services/auth.guard';
import { Layout01Component } from '../layout/layout01/layout01.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('../cityfun/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'layout',
    component: Layout01Component,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'geolabel', pathMatch: 'full' },

      {
        path: 'geolabel',
        loadChildren: () => import('../business/geo-label/geo-label.module').then(m => m.GeoLabelModule),
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class RouteRoutingModule { }

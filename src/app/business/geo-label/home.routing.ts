import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { GeoLabelComponent } from './geo-label.component';
const routes: Routes = [
  {
    path: '',
    component: GeoLabelComponent,
    children: [
      { path: '', redirectTo: 'sign', pathMatch: 'full' },
      {
        path: 'sign',
        loadChildren: () =>
          import('./sign/sign.module').then((m) => m.SignModule),
        data: { path: 'sign' },
      },
      {
        path: 'classify',
        loadChildren: () =>
          import('./classify/classify.module').then((m) => m.ClassifyModule),
        data: { path: 'classify' },
      },
      {
        path: 'collect',
        loadChildren: () =>
          import('./collect/collect.module').then((m) => m.CollectModule),
        data: { path: 'collect' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeoLabelRoutesModule {}

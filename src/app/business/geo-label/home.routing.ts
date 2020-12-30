
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
          import('./sign/sign.module').then(
            (m) => m.SignModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeoLabelRoutesModule {}

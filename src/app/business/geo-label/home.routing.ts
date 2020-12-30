
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { GeoLabelComponent } from './geo-label.component';
const routes: Routes = [
  {
    path: '',
    component: GeoLabelComponent,
    children:[
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeoLabelRoutesModule {}

import { Routes, RouterModule } from '@angular/router';
import { CollectComponent } from './collect.component';

const routes: Routes = [
  {  
    path:'',
    component:CollectComponent
  },
];

export const CollectRoutes = RouterModule.forChild(routes);

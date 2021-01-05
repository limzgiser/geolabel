import { Routes, RouterModule } from '@angular/router';
import { ClassifyComponent } from './classify.component';

const routes: Routes = [
  {  
    path:"",
    component:ClassifyComponent
  },
];

export const ClassifyRoutes = RouterModule.forChild(routes);

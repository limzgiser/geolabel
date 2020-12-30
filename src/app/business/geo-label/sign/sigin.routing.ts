import { Routes, RouterModule } from '@angular/router';
import { SignComponent } from './sign.component';

const routes: Routes = [
  { 
    path:"",
    component:SignComponent
   },
];

export const SiginRoutes = RouterModule.forChild(routes);

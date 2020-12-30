import { SharedModule } from './../../shared/shared.module';

import { LoginRoutes } from './login.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';



@NgModule({
  imports: [
    CommonModule,
    LoginRoutes,
    SharedModule

  ],
  declarations: [LoginComponent],
  providers: []
})
export class LoginModule { }

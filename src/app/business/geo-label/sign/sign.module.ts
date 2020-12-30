import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignComponent } from './sign.component';
import { SiginRoutes } from './sigin.routing';

@NgModule({
  imports: [
    CommonModule,SiginRoutes
  ],
  declarations: [SignComponent]
})
export class SignModule { }

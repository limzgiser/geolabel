import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassifyComponent } from './classify.component';
import { ClassifyRoutes } from './classify.routing';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [ClassifyComponent,],
  imports: [
    CommonModule,ClassifyRoutes,SharedModule
  ]
})
export class ClassifyModule { }

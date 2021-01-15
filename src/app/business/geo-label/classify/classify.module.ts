import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassifyComponent } from './classify.component';
import { ClassifyRoutes } from './classify.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClassifyListComponent } from './classify-list/classify-list.component';



@NgModule({
  declarations: [ClassifyComponent, ClassifyListComponent,],
  imports: [
    CommonModule,ClassifyRoutes,SharedModule
  ]
})
export class ClassifyModule { }

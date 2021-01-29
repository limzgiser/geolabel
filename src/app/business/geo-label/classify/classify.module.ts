import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassifyComponent } from './classify.component';
import { ClassifyRoutes } from './classify.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClassifyListComponent } from './classify-list/classify-list.component';
import {ClassifyService} from "./classify.service";
import {LabelCommonModule} from "../common/label-common.module";
import { EditClassifyComponent } from './edit-classify/edit-classify.component';
import { ClassifyTreeComponent } from './classify-tree/classify.tree.component';
import { TreeContentComponent } from './tree-content/tree-content.component';

@NgModule({
  declarations: [
    ClassifyComponent,
    ClassifyListComponent,
    EditClassifyComponent,
    TreeContentComponent,
    ClassifyTreeComponent,
  ],
  imports: [
    CommonModule,ClassifyRoutes,SharedModule,LabelCommonModule
  ],
  providers:[ClassifyService]
})
export class ClassifyModule { }

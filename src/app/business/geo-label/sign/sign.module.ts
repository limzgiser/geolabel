import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignComponent } from './sign.component';
import { SiginRoutes } from './sigin.routing';
import { LabelCommonModule } from '../common/label-common.module';
import { LabelSearchComponent } from './label-search/label-search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LabelAddComponent } from './label-add/label-add.component';
import { BaseInfoComponent } from './label-add/base-info/base-info.component';
import { LabelFeatureComponent } from './label-add/label-feature/label-feature.component';
import { EditToolComponent } from './edit-tool/edit-tool.component';
import { EditToolService } from './services/edit-tool.service';
import { AddTagIconPipe } from './label-add/label-feature/addTagIcon.pipe';
import { LabelSuccessComponent } from './label-add/label-success/label-success.component';
import {SignService} from "./sign.service";
import { AddContentComponent } from './label-add/add-content/add-content.component';


@NgModule({
  imports: [CommonModule, SiginRoutes, LabelCommonModule, SharedModule],
  declarations: [
    BaseInfoComponent,
    SignComponent,
    LabelSearchComponent,
    LabelAddComponent,
    LabelFeatureComponent,
    EditToolComponent,
    AddTagIconPipe,
    LabelSuccessComponent,
    AddContentComponent,
  ],
  providers: [EditToolService,SignService],
})
export class SignModule {}

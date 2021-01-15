import {ApplicationRef, NgModule} from '@angular/core';
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
import {LabelDetailComponent} from "./label-detail/label-detail.component";
import {LabelDetailContentComponent} from "./label-detail/label-detail-content/label-detail-content.component";
import {FeatureDetailComponent} from "./label-detail/feature-detail/feature-detail.component";
import { LabelCommentComponent } from './label-detail/label-comment/label-comment.component';
import { LabelBaseinfoComponent } from './label-detail/label-baseinfo/label-baseinfo.component';
import { LabelLegendComponent } from './label-legend/label-legend.component';

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
    LabelDetailComponent,
    LabelDetailContentComponent,
    FeatureDetailComponent,
    LabelCommentComponent,
    LabelBaseinfoComponent,
    LabelLegendComponent
  ],
  providers: [EditToolService,SignService,ApplicationRef],
})
export class SignModule {}

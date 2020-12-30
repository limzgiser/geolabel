import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignComponent } from './sign.component';
import { SiginRoutes } from './sigin.routing';
import { LabelCommonModule } from '../common/label-common.module';
import { LabelSearchComponent } from './label-search/label-search.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,SiginRoutes,LabelCommonModule,SharedModule
  ],
  declarations: [SignComponent,LabelSearchComponent]
})
export class SignModule { }

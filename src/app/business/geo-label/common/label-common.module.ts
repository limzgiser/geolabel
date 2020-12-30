import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelContainerComponent } from './label-container/label-container.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LabelListComponent } from './label-list/label-list.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [LabelContainerComponent, LabelListComponent],
  exports: [LabelContainerComponent, LabelListComponent],
})
export class LabelCommonModule {}

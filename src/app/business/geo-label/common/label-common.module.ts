import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelContainerComponent } from './label-container/label-container.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LabelListComponent } from './label-list/label-list.component';
import { AddMarkerStatueComponent } from './add-marker-statue/add-marker-statue.component';
import { CounterComponentComponent } from './counter-component/counter-component.component';
import { FormTagComponent } from './form-tag/form-tag.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [LabelContainerComponent, LabelListComponent,AddMarkerStatueComponent, CounterComponentComponent, FormTagComponent],
  exports: [LabelContainerComponent, LabelListComponent,AddMarkerStatueComponent,CounterComponentComponent,FormTagComponent],
})
export class LabelCommonModule {}

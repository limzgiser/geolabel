import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeoLabelComponent } from './geo-label.component';
import { TreelyrControlComponent } from './components/treelyr-control/treelyr-control.component';
import { CityfunModule } from './../../cityfun/cityfun.module';
import { GeoLabelRoutesModule } from './home.routing';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { LabelDetailContentComponent } from './label-detail/label-detail-content/label-detail-content.component';

@NgModule({
  imports: [CommonModule, CityfunModule, GeoLabelRoutesModule],
  declarations: [GeoLabelComponent, TreelyrControlComponent, SideNavComponent, LabelDetailContentComponent],
  providers: [],
})
export class GeoLabelModule {}

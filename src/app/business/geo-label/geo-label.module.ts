import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeoLabelComponent } from './geo-label.component';
import { TreelyrControlComponent } from './components/treelyr-control/treelyr-control.component';
import { CityfunModule } from './../../cityfun/cityfun.module';
import { GeoLabelRoutesModule } from './home.routing';
import { SideNavComponent } from './components/side-nav/side-nav.component';

@NgModule({
  imports: [CommonModule, CityfunModule, GeoLabelRoutesModule],
  declarations: [GeoLabelComponent, TreelyrControlComponent, SideNavComponent],
  providers: [],
})
export class GeoLabelModule {}

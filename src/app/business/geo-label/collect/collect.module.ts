import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectComponent } from './collect.component';
import { CollectRoutes } from './collect.routing';

@NgModule({
  imports: [
    CommonModule,
    CollectRoutes
  ],
  declarations: [CollectComponent]
})
export class CollectModule { }

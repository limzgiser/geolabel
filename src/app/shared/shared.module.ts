// import { NgxG2Directive } from './graphics/ngxG2.directive';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { IconsProviderModule } from './icons-provider.module';
import { HttpClientModule } from '@angular/common/http';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import zh from '@angular/common/locales/zh';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { CfScrollComponent, SideMenuComponent } from './components';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
const antZORRO = [
  NzMenuModule,
  NzMessageModule,
  NzInputModule,
  NzTreeModule,
  NzLayoutModule,
  NzIconModule,
  IconsProviderModule,
  NzBreadCrumbModule,
  NzButtonModule,
  NzPaginationModule,
  NzSelectModule,
  NzDatePickerModule,
  NzFormModule,
  NzRadioModule,
  NzTagModule,
  NzCascaderModule,
  NzPopconfirmModule,
  NzSwitchModule,
  NzModalModule,
  NzEmptyModule
];

const directive = [];
// ng 核心模块
const coreModule = [
  CommonModule,
  NzDropDownModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
];
// 业务公共组件
const selfcomms = [SideMenuComponent, HeaderComponent,CfScrollComponent];

registerLocaleData(zh);
@NgModule({
  imports: [...coreModule, ...antZORRO],
  declarations: [...selfcomms, ...directive],
  exports: [...coreModule, ...selfcomms, ...antZORRO, ...directive],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
})
export class SharedModule {}

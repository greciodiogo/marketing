import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '@app/shared/sharedMaterial.module';
import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { BoxModule } from '@app/shared/components/box/box.module';
import { MarketingRoutingModule } from './marketing-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedGlobalModule,
    SharedMaterialModule,
    ModalModule.forRoot(),
    BoxModule,
    MarketingRoutingModule,
  ],
})
export class MarketingModule {}

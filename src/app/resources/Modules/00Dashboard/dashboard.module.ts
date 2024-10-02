import { BoxModule } from '../../../shared/components/box/box.module';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ConnectionModule } from '@app/shared/components/connection/connection.module';
@NgModule({
  imports: [
    DashboardRoutingModule,
    ConnectionModule,
    BoxModule
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }

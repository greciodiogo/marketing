import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
 import { ConnectionModule } from '@app/shared/components/connection/connection.module';
import { PasswordModule } from '@app/resources/Modules/06Security/02Users/components/password/password.module';

@NgModule({
  imports: [CommonModule, RouterModule,PasswordModule],
  exports: [HeaderComponent, ConnectionModule],
  declarations: [HeaderComponent],
})
export class HeaderModule {}


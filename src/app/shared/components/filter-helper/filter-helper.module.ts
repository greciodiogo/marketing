import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterHelperComponent } from './filter-helper/filter-helper.component';
import { LoadingModule } from '../loading/loading.module';
import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';
import { SharedMaterialModule } from '@app/shared/sharedMaterial.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsideRightModule } from '../aside-right/aside-right.module';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    FilterHelperComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoadingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    AsideRightModule
  ],
  exports: [FilterHelperComponent],
  providers: [],
})
export class FilterHelperModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingModule } from '../loading/loading.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsideRightModule } from '../aside-right/aside-right.module';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  declarations: [
    TextEditorComponent,
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
    AsideRightModule,
    AngularEditorModule ,
  ],
  exports: [TextEditorComponent],
  providers: [],
})
export class TextEditorModule {}

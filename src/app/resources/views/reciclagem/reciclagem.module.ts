import { NgModule } from '@angular/core'; 
import { ReciclagemRoutingModule } from './reciclagem-routing.module';
 
import { SharedMaterialModule } from '@app/shared/sharedMaterial.module';
import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';

import { ReciclagemListarComponent } from './reciclagem-listar/reciclagem-listar.component'; 
 

@NgModule({
  declarations: [ReciclagemListarComponent],
  imports: [
    SharedGlobalModule,
    SharedMaterialModule,
    ReciclagemRoutingModule
  ]
})
export class ReciclagemModule { }

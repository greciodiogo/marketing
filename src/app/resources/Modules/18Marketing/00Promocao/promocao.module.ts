import { NgModule } from '@angular/core';
import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';
import { SharedMaterialModule } from '@app/shared/sharedMaterial.module';

import { PromocaoRoutingModule } from './promocao.routing.module';
import { PromocaoListarComponent } from './listar-promocao/listar-promocao.component';
import { PromocaoFormCreateOrEditComponent } from './promocao-form-create-or-edit/promocao-form-create-or-edit.component';
import { ConsultarProdutosPromocaoComponent } from './consultar-produtos-promocao/consultar-produtos-promocao.component';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BoxModule } from '@app/shared/components/box/box.module';
import { TipoPromocaoListarComponent } from './configs/promocao-tipo/promocao-tipo-listar/promocao-tipo-listar.component';
import { TipoPromocaoFormCreateOrEditComponent } from './configs/promocao-tipo/promocao-tipo-form-create-or-edit/promocao-tipo-form-create-or-edit.component';
import { DescricaoAlterarEstadoPromocaoCreateOrEditComponent } from './descricao-alterar-estado-promocao-create-or-edit/descricao-alterar-estado-promocao-create-or-edit.component';

@NgModule({
  declarations: [
    PromocaoListarComponent, 
    PromocaoFormCreateOrEditComponent, 
    ConsultarProdutosPromocaoComponent, 
    TipoPromocaoListarComponent,
    TipoPromocaoFormCreateOrEditComponent,
    DescricaoAlterarEstadoPromocaoCreateOrEditComponent,
  ],
  imports: [ 
    CommonModule,
    SharedGlobalModule,
    SharedMaterialModule,
    ModalModule.forRoot(),
    BoxModule,
    PromocaoRoutingModule],
})
export class PromocaoModule {}

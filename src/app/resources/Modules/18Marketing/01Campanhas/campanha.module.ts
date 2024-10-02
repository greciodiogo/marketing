import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '@app/shared/sharedMaterial.module';
import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { BoxModule } from '@app/shared/components/box/box.module';
import { CampanhasRoutingModule } from './campanha-routing.module';
import { ListarCampanhaComponent } from './listar-campanha/listar-campanha.component';
import { AddOrEditCampanhaComponent } from './components/add-or-edit-campanha/add-or-edit-campanha.component';
import { SegmentacaoPublicoComponent } from './components/segmentacao-publico/segmentacao-publico.component';
import { AddOrEditsegmentacaoComponent } from './components/add-or-editsegmentacao/add-or-editsegmentacao.component';
import { ValidarCampanhaComponent } from './components/validar-campanha/validar-campanha.component';
import { RegrasAutomacaoComponent } from './components/regras-automacao/regras-automacao.component';
import { CanaisDistribuicaoComponent } from './components/canais-distribuicao/canais-distribuicao.component';
import { DespublicarCampanhaComponent } from './components/despublicar-campanha/despublicar-campanha.component';
import { DadosCampanhaComponent } from './components/dados-campanha/dados-campanha.component';
import { CampanhaTipoListarComponent } from './configs/campanha-tipo/campanha-tipo-listar/campanha-tipo-listar.component';
import { CampanhaTipoCreateOrEditComponent } from './configs/campanha-tipo/campanha-tipo-create-or-edit/campanha-tipo-create-or-edit.component';
import { VisualizarCampanhaComponent } from './components/visualizar-campanha/visualizar-campanha.component';
import {MatChipsModule} from '@angular/material/chips';
import { TruncatePipe } from './pipe/truncate'; // ajuste o caminho conforme necessário


@NgModule({
  declarations: [
    ListarCampanhaComponent,
    AddOrEditCampanhaComponent,
    SegmentacaoPublicoComponent,
    AddOrEditsegmentacaoComponent,
    ValidarCampanhaComponent,
    RegrasAutomacaoComponent,
    CanaisDistribuicaoComponent,
    DespublicarCampanhaComponent,
    DadosCampanhaComponent,
    CampanhaTipoListarComponent,
    CampanhaTipoCreateOrEditComponent,
    VisualizarCampanhaComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    SharedGlobalModule,
    SharedMaterialModule,
    ModalModule.forRoot(),
    BoxModule,
    CampanhasRoutingModule,
  ],
})
export class CampanhasModule {}

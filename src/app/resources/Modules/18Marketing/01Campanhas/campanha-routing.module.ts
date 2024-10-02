import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/guards/auth.guard';
import { PermissionGuard } from '@core/security/guards/permission.guard';
import { ListarCampanhaComponent } from './listar-campanha/listar-campanha.component';
import { CampanhaTipoCreateOrEditComponent } from './configs/campanha-tipo/campanha-tipo-create-or-edit/campanha-tipo-create-or-edit.component';

const routes: Routes = [
  {
    path: 'listar',
    component: ListarCampanhaComponent,
    canActivate: [AuthGuard],
    data: {
    //  expectedPermission: "listar-campanhas",
      title: "Campanhas",
      layout: {
        customLayout: true,
        layoutNavigationTop: false,
      }
    }
  },
  {
    path: 'configs/tipo-campanha/listar',
    component: CampanhaTipoCreateOrEditComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      expectedPermission: "listar-config-tipo-campanha",
      title: 'Tipo Campanha',
      layout: {
        customLayout: true,
        layoutNavigationTop: false,
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampanhasRoutingModule {}

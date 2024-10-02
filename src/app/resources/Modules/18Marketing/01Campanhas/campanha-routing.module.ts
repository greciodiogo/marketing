import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/guards/auth.guard';
import { PermissionGuard } from '@core/security/guards/permission.guard';
import { ListarCampanhaComponent } from './listar-campanha/listar-campanha.component';
import { CampanhaTipoListarComponent } from './configs/campanha-tipo/campanha-tipo-listar/campanha-tipo-listar.component';

const routes: Routes = [
  {
    path: 'listar',
    component: ListarCampanhaComponent,
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
    component: CampanhaTipoListarComponent,
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/core/security/guards/auth.guard';
import { PromocaoListarComponent } from './listar-promocao/listar-promocao.component';
import { TipoPromocaoListarComponent } from './configs/promocao-tipo/promocao-tipo-listar/promocao-tipo-listar.component';
import { PermissionGuard } from '@app/core/security/guards/permission.guard';

const routes: Routes = [
  {
    path: 'listar',
    component: PromocaoListarComponent,
    data: {
      title: 'Promoção',
      layout: {
        customLayout: true,
        layoutNavigationTop: false,
      },
    },
  },


  {
    path: 'configs/tipo-promocao/listar',
    component: TipoPromocaoListarComponent,
    data: {
      title: 'Promoção',
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
export class PromocaoRoutingModule {}

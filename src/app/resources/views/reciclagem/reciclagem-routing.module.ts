import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '@core/security/guards/auth.guard'
import {PermissionGuard} from '@core/security/guards/permission.guard';
import { ReciclagemListarComponent } from './reciclagem-listar/reciclagem-listar.component'; 
const routes: Routes = [ 
  {
    path: 'lista', 
    component: ReciclagemListarComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      expectedPermission: "reciclagem",    
      title: "Reciclagem", 
      layout:{
        customLayout: true, 
        layoutNavigationTop: false, 
      }
    } 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReciclagemRoutingModule {}

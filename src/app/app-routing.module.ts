import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Import Containers

import { P404Component } from './resources/errors/404.component';
import { P403Component } from './resources/errors/403.component';
import { P500Component } from './resources/errors/500.component';
import { AuthGuard } from './core/security/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404',
      layout: { customLayout: false, layoutNavigationTop: false },
    },
  },
  {
    path: '403',
    component: P403Component,
    canActivate: [AuthGuard],
    data: {
      title: 'Page 403',
      layout: { customLayout: false, layoutNavigationTop: false },
    },
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500',
      layout: { customLayout: false, layoutNavigationTop: false },
    },
  },
  {
    path: '',
    data: {
      title: '',
    },
    loadChildren: () =>
      import('./resources/Modules/00Dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  }, 
  
 
  {
    path: 'marketing',
    data: {
      title: 'marketing',
      layout: {
        customLayout: true,
        layoutNavigationTop: true,
      },
    },
    loadChildren: () =>
      import('./resources/Modules/18Marketing/marketing.module').then(
        (m) => m.MarketingModule
      ),
  },
 
  {
    path: 'acl',
    data: {
      title: 'Controle de Acesso',
      layout: { customLayout: false, layoutNavigationTop: true },
    },
    children: [
      {
        path: 'users',
        data: {
          title: 'Utilizadores',
          layout: { customLayout: false, layoutNavigationTop: true },
        },
        loadChildren: () =>
          import('./resources/Modules/06Security/02Users/users.module').then(
            (m) => m.UsersModule
          ),
      },
      {
        path: 'permissions',
        data: {
          title: 'Permissões',
          layout: { customLayout: false, layoutNavigationTop: true },
        },
        loadChildren: () =>
          import(
            './resources/Modules/06Security/01Acl/01Permission/permissions.module'
          ).then((m) => m.PermissionsModule),
      },
      {
        path: 'roles',
        data: {
          title: 'Roles',
          layout: { customLayout: false, layoutNavigationTop: true },
        },
        loadChildren: () =>
          import(
            './resources/Modules/06Security/01Acl//02Roles/roles.module'
          ).then((m) => m.RolesModule),
      },
      {
        path: 'modulos',
        data: {
          title: 'Módulos',
          layout: { customLayout: false, layoutNavigationTop: true },
        },
        loadChildren: () =>
          import(
            './resources/Modules/06Security/01Acl//03Modulos/modulos.module'
          ).then((m) => m.ModulosModule),
      },
   
      {
        path: 'permission_fields',
        data: {
          title: 'Permissões de Campos',
          layout: { customLayout: false, layoutNavigationTop: true },
        },
        loadChildren: () =>
          import(
            './resources/Modules/06Security/01Acl/04PermissionField/permission-fields.module'
          ).then((m) => m.PermissionFieldsModule),
      }
    ],
  },

  {
    path: '',
    data: {
      title: 'Login',
    },
    children: [
      {
        path: 'login',
        data: {
          title: 'Login',
          layout: { customLayout: false, layoutNavigationTop: true },
        },
        loadChildren: () =>
          import(
            './resources/Modules/06Security/00Auth/authentication.module'
          ).then((m) => m.AuthenticationModule),
      },
    ],
  },

  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404',
      layout: { customLayout: false, layoutNavigationTop: true },
    },
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }

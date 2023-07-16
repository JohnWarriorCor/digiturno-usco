import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TokenComponent } from './components/token/token.component';
import { AuthGuard } from './guards/auth.guard';
import { PerfilComponent } from './components/pages/perfil/perfil.component';
import { PerfilAdminComponent } from './components/admin/perfil-admin/perfil-admin.component';
import { InicioComponent } from './components/pages/inicio/inicio.component';
import { InicioAdminComponent } from './components/admin/inicio-admin/inicio-admin.component';

const routes: Routes = [
  //COMPONENTES DEL SISTEMA
  { path: 'login', component: LoginComponent },
  { path: 'token', component: TokenComponent },

  {
    path: 'inicio-admin',
    component: InicioAdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'perfil-admin',
    component: PerfilAdminComponent,
    canActivate: [AuthGuard],
  },

  /* { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] }, */

  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },

  //REDIRECCIONAMIENTO COMOPONENTE POR DEFECTO PARA RUTAS INEXISTENTES EN EL NAVEGADOR
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: '**', pathMatch: 'full', redirectTo: '/login' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

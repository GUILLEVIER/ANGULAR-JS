import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import {
  canActivatePublicGuard,
  canMatchPublicGuard,
} from './auth/guards/public.guard';
import {
  canActivateAuthGuard,
  canMatchAuthGuard,
} from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [canActivatePublicGuard],
    canMatch: [canMatchPublicGuard],
  },
  {
    path: 'scoreboard',
    loadChildren: () =>
      import('./scoreboard/scoreboard.module').then((m) => m.ScoreboradModule),
    canActivate: [canActivateAuthGuard],
    canMatch: [canMatchAuthGuard],
  },
  {
    path: '404',
    component: Error404PageComponent,
  },
  {
    path: '',
    redirectTo: 'scoreboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

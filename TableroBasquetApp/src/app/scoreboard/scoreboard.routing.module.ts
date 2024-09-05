import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MyScorePageComponent } from './pages/my-score-page/my-score-page.component';
import { SharedWindowComponent } from './pages/shared-window/shared-window.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'my-score', component: MyScorePageComponent },
      { path: 'shared-window', component: SharedWindowComponent },
      { path: '**', redirectTo: 'home' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScoreboardRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/home/home.component'
import { ZapatillasComponent } from '../app/zapatillas/zapatillas.component'
import { CursosComponent } from './cursos/cursos.component';
import { VideojuegoComponent } from './videojuego/videojuego.component';
import { ExternoComponent } from './externo/externo.component';
import { ContactoComponent } from './contacto/contacto.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'zapatillas',
    component: ZapatillasComponent
  },
  {
    path: 'cursos',
    component: CursosComponent
  },
  {
    path: 'videojuego',
    component: VideojuegoComponent
  },
  {
    path: 'externo',
    component: ExternoComponent
  },
  {
    path: 'contacto',
    component: ContactoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

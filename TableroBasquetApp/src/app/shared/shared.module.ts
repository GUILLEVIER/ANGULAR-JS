import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [Error404PageComponent, LoaderComponent],
  imports: [CommonModule, MaterialModule],
  exports: [Error404PageComponent, LoaderComponent],
})
export class SharedModule {}

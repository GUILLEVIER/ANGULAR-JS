import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, UppercaseDirective, IfNotDirective } from './app.component';
import { PrimerComponente } from './primer-componente/primer-componente.component';
import { SegundoComponente } from './segundo-componente/segundo-componente.component'

@NgModule({
  declarations: [
    AppComponent,
    PrimerComponente,
    SegundoComponente,
    UppercaseDirective,
    IfNotDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TitleService } from './title.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChangeTitleComponent } from './change-title/change-title.component';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    ChangeTitleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [TitleService],
  bootstrap: [AppComponent]
})
export class AppModule { }

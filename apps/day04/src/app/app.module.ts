import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Day04CoreModule } from '@day04/core';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, Day04CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

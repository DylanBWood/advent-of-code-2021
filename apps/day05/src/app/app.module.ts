import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Day05CoreModule } from '@day05/core';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, Day05CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

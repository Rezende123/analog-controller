import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AnalogControllerModule } from './analog-controller/analog-controller.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AnalogControllerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

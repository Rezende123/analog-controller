import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalogControllerComponent } from './analog-controller.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AnalogControllerComponent
  ],
  exports: [
    AnalogControllerComponent
  ]
})
export class AnalogControllerModule { }

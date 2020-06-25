import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'analog-controller',
  templateUrl: './analog-controller.component.html',
  styleUrls: ['./analog-controller.component.css']
})
export class AnalogControllerComponent implements AfterViewInit {

  @ViewChild('analog')
  analog: ElementRef;

  @ViewChild('controller')
  controller: ElementRef;

  @Input()
  controllerSize = '200px';

  constructor() { }

  ngAfterViewInit() {
    this.controller.nativeElement.style.width = this.controllerSize;
    this.controller.nativeElement.style.height = this.controllerSize;
  }

  moveAnalog(mouse: any) {
    if (mouse.srcElement.id === '_analog_') {
      return;
    }

    // Offset é a posição dentro do elemento
    const mouseX = mouse.offsetX;
    const mouseY = mouse.offsetY;
    const analogMiddleHeight = this.analog.nativeElement.clientHeight / 2;
    const analogMiddleWidth = this.analog.nativeElement.clientWidth / 2;

    const x = mouseX - analogMiddleWidth;
    const y = mouseY - analogMiddleHeight;

    this.setAnalogPosition(x, y);
  }

  setAnalogPosition(x: number, y: number) {
    this.analog.nativeElement.style.top  = `${y}px`;
    this.analog.nativeElement.style.left = `${x}px`;
  }

  mouseOutController(mouse) {
    if (mouse.toElement.id !== '_controller_' && mouse.toElement.id !== '_analog_') {
      console.log('Saiu');
    }
  }
}

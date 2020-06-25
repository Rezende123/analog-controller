import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { RelativeAngleService } from './services/relative-angle.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'analog-controller',
  templateUrl: './analog-controller.component.html',
  styleUrls: ['./analog-controller.component.css']
})
export class AnalogControllerComponent implements AfterViewInit {

  @ViewChild('analog')
  _analog: ElementRef;
  get analog() {
    return this._analog.nativeElement;
  }

  @ViewChild('controller')
  _controller: ElementRef;
  get controller() {
    return this._controller.nativeElement;
  }

  @Input()
  controllerSize = '200px';

  @Output()
  angle = new EventEmitter();

  _relativeAngle: number;
  set relativeAngle(newAngle: number) {
    this._relativeAngle = newAngle;
    this.angle.emit(newAngle);
  }

  constructor(
    private relativeAngleService: RelativeAngleService
  ) { }

  ngAfterViewInit() {
    this.controller.style.width = this.controllerSize;
    this.controller.style.height = this.controllerSize;
  }

  moveAnalog(mouse: any) {
    if (mouse.srcElement.id === '_analog_') {
      return;
    }

    // Offset é a posição dentro do elemento
    const mouseX = mouse.offsetX;
    const mouseY = mouse.offsetY;
    const analogMiddleHeight = this.analog.clientHeight / 2;
    const analogMiddleWidth = this.analog.clientWidth / 2;

    const x = mouseX - analogMiddleWidth;
    const y = mouseY - analogMiddleHeight;

    this.getAngleRelative(mouseX, mouseY);
    this.setAnalogPosition(x, y);
  }

  setAnalogPosition(x: number, y: number) {
    this.analog.style.top  = `${y}px`;
    this.analog.style.left = `${x}px`;
  }

  getAngleRelative(x: number, y: number) {
    const controllerCenterX = this.controller.clientWidth / 2;
    const controllerCenterY = this.controller.clientHeight / 2;

    const angle = this.relativeAngleService.calcule(
      controllerCenterX, controllerCenterY,
      x, y
    );

    this.relativeAngle = Math.floor(angle);
  }

  mouseOutController(mouse) {
    if (mouse.toElement.id !== '_controller_' && mouse.toElement.id !== '_analog_') {
      const controllerMiddleWidth = this.controller.clientWidth / 2;
      const controllerMiddleHeight = this.controller.clientHeight / 2;
      const analogMiddleHeight = this.analog.clientHeight / 2;
      const analogMiddleWidth = this.analog.clientWidth / 2;

      const centerX = controllerMiddleWidth - analogMiddleWidth;
      const centerY = controllerMiddleHeight - analogMiddleHeight;

      this.setAnalogPosition(centerX, centerY);
      this.relativeAngle = null;
    }
  }
}

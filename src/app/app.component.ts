import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  angle: number;

  setAngle(angle: number) {
    this.angle = angle;
  }
}

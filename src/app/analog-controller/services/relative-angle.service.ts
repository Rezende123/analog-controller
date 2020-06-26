import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RelativeAngleService {

  constructor() { }

  calcule(centerX, centerY, endX, endY) {
    const adjacent = (centerX > endX) ?
      centerX - endX : endX - centerX;
    const opposite = (centerY > endY) ?
      centerY - endY : endY - centerY;

    const angleOfTangent = (catO, catA) => Math.atan(catO / catA) * 180 / Math.PI;
    let angle = angleOfTangent(opposite, adjacent);

    const isSecundQuadrant = centerX < endX && centerY > endY;
    const isThirdQuadrant = centerX < endX && centerY < endY;
    const isQuarterQuadrant = centerX > endX && centerY < endY;

    if (isSecundQuadrant) {
      angle += 90;
    } else
    if (isThirdQuadrant) {
      angle += 180;
    } else
    if (isQuarterQuadrant) {
      angle += 270;
    }

    return angle;
  }

  calculePointByAngle(radius: number, angle: number) {
    const toRadians = angleDegress => angleDegress * (Math.PI / 180);
    const cos = (hypotenuse, alpha) => Math.cos(toRadians(alpha)) * hypotenuse;
    const sin = (hypotenuse, alpha) => Math.sin(toRadians(alpha)) * hypotenuse;

    const opposite = sin(radius, angle);
    const adjacent = cos(radius, angle);

    return {
      pointX: Math.floor(opposite),
      pointY: Math.floor(adjacent)
    };
  }
}

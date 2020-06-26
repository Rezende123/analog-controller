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
    const isSecundQuadrant = angle > 90 && angle <= 180;
    const isThirdQuadrant = angle > 180 && angle <= 270;
    const isQuarterQuadrant = angle > 270;

    if (isSecundQuadrant) {
      angle -= 90;
    } else
    if (isThirdQuadrant) {
      angle -= 180;
    } else
    if (isQuarterQuadrant) {
      angle -= 270;
    }

    const toRadians = angleDegress => angleDegress * (Math.PI / 180);
    const cos = (hypotenuse, alpha) => Math.cos(toRadians(alpha)) * hypotenuse;
    const sin = (hypotenuse, alpha) => Math.sin(toRadians(alpha)) * hypotenuse;

    let opposite = sin(radius, angle);
    let adjacent = cos(radius, angle);

    if (isSecundQuadrant) {
      const aux = opposite;
      opposite = adjacent;
      adjacent = aux;

      opposite += (radius / 2) + adjacent;
    } else
    if (isThirdQuadrant) {
      const aux = opposite;
      opposite = adjacent;
      adjacent = aux;

      opposite += radius;
      adjacent += radius;
    } else
    if (isQuarterQuadrant) {
      const aux = opposite;
      opposite = adjacent;
      adjacent = aux;

      adjacent = (2 * radius) - adjacent;
    }

    return {
      pointX: Math.floor(opposite),
      pointY: Math.floor(adjacent)
    };
  }
}

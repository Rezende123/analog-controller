import { Injectable } from '@angular/core';

enum Quadrants {
  first,
  secund,
  third,
  quarter
}

@Injectable({
  providedIn: 'root'
})
export class RelativeAngleService {

  private quadrant: Quadrants;

  constructor() { }

  setQuadrant(isSecund, isThird, isQuarter) {
    if (isSecund) {
      this.quadrant = Quadrants.secund;
    } else
    if (isThird) {
      this.quadrant = Quadrants.third;
    } else
    if (isQuarter) {
      this.quadrant = Quadrants.quarter;
    } else {
      this.quadrant = Quadrants.first;
    }
  }

  setQuadrantByCoordinates(centerX, centerY, endX, endY) {
    const isSecund = centerX < endX && centerY > endY;
    const isThird = centerX < endX && centerY < endY;
    const isQuarter = centerX > endX && centerY < endY;

    this.setQuadrant(isSecund, isThird, isQuarter);
  }

  setQuadrantByAngle(angle) {
    const isSecund = angle > 90 && angle <= 180;
    const isThird = angle > 180 && angle <= 270;
    const isQuarter = angle > 270;

    this.setQuadrant(isSecund, isThird, isQuarter);
  }

  operationByQuadrant = (opSecund, opThird, opQuarter) => {
    switch (this.quadrant) {
      case Quadrants.secund: opSecund(); return;
      case Quadrants.third: opThird(); return;
      case Quadrants.quarter: opQuarter(); return;
    }
  }

  calcule(centerX, centerY, endX, endY) {
    const adjacent = (centerX > endX) ?
      centerX - endX : endX - centerX;
    const opposite = (centerY > endY) ?
      centerY - endY : endY - centerY;

    const angleOfTangent = (catO, catA) => Math.atan(catO / catA) * 180 / Math.PI;
    let angle = angleOfTangent(opposite, adjacent);

    this.setQuadrantByCoordinates(centerX, centerY, endX, endY);

    this.operationByQuadrant(
      () => angle += 90,
      () => angle += 180,
      () => angle += 270
    );

    return angle;
  }

  calculePointByAngle(radius: number, angle: number) {
    this.setQuadrantByAngle(angle);

    this.operationByQuadrant(
      () => angle -= 90,
      () => angle -= 180,
      () => angle -= 270
    );

    const toRadians = angleDegress => angleDegress * (Math.PI / 180);
    const cos = (hypotenuse, alpha) => Math.cos(toRadians(alpha)) * hypotenuse;
    const sin = (hypotenuse, alpha) => Math.sin(toRadians(alpha)) * hypotenuse;

    let opposite = sin(radius, angle);
    let adjacent = cos(radius, angle);

    this.operationByQuadrant(
      () => {
        const aux = opposite;
        opposite = adjacent;
        adjacent = aux;

        opposite += (radius / 2) + adjacent;
      },
      () => {
        const aux = opposite;
        opposite = adjacent;
        adjacent = aux;

        opposite += radius;
        adjacent += radius;
      },
      () => {
        const aux = opposite;
        opposite = adjacent;
        adjacent = aux;

        adjacent = (2 * radius) - adjacent;
      }
    );

    return {
      pointX: Math.floor(opposite),
      pointY: Math.floor(adjacent)
    };
  }
}

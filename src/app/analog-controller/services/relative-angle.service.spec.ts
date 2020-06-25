/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RelativeAngleService } from './relative-angle.service';

describe('Service: RelativeAngle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RelativeAngleService]
    });
  });

  it('should ...', inject([RelativeAngleService], (service: RelativeAngleService) => {
    expect(service).toBeTruthy();
  }));
});

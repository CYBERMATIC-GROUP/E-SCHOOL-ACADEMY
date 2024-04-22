import { TestBed } from '@angular/core/testing';

import { CentreExamenService } from './centre-examen.service';

describe('CentreExamenService', () => {
  let service: CentreExamenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentreExamenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

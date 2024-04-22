import { TestBed } from '@angular/core/testing';

import { PyramideService } from './pyramide.service';

describe('PyramideService', () => {
  let service: PyramideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PyramideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

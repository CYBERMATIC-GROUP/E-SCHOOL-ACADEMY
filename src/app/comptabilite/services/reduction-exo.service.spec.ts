import { TestBed } from '@angular/core/testing';

import { ReductionExoService } from './reduction-exo.service';

describe('ReductionExoService', () => {
  let service: ReductionExoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReductionExoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

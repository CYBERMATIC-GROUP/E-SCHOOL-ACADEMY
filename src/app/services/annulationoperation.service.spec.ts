import { TestBed } from '@angular/core/testing';

import { AnnulationoperationService } from './annulationoperation.service';

describe('AnnulationoperationService', () => {
  let service: AnnulationoperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnulationoperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

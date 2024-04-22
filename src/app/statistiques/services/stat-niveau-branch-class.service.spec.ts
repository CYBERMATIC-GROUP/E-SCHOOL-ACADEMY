import { TestBed } from '@angular/core/testing';

import { StatNiveauBranchClassService } from './stat-niveau-branch-class.service';

describe('StatNiveauBranchClassService', () => {
  let service: StatNiveauBranchClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatNiveauBranchClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

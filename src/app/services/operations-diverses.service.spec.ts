import { TestBed } from '@angular/core/testing';

import { OperationsDiversesService } from './operations-diverses.service';

describe('OperationsDiversesService', () => {
  let service: OperationsDiversesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationsDiversesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

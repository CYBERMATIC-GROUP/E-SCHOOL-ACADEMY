import { TestBed } from '@angular/core/testing';

import { FraisPayerService } from './frais-payer.service';

describe('FraisPayerService', () => {
  let service: FraisPayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FraisPayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

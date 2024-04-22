import { TestBed } from '@angular/core/testing';

import { LiasseService } from './liasse.service';

describe('LiasseService', () => {
  let service: LiasseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiasseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

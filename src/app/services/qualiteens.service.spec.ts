import { TestBed } from '@angular/core/testing';

import { QualiteensService } from './qualiteens.service';

describe('QualiteensService', () => {
  let service: QualiteensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QualiteensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

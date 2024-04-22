import { TestBed } from '@angular/core/testing';

import { ReleveGlobalService } from './releve-global.service';

describe('ReleveGlobalService', () => {
  let service: ReleveGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReleveGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { StatuseleveService } from './statuseleve.service';

describe('StatuseleveService', () => {
  let service: StatuseleveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatuseleveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

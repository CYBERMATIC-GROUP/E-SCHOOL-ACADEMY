import { TestBed } from '@angular/core/testing';

import { EditUrlService } from './edit-url.service';

describe('EditUrlService', () => {
  let service: EditUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

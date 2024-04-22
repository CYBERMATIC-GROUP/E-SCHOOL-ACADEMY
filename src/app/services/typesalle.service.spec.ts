import { TestBed } from '@angular/core/testing';

import { TypesalleService } from './typesalle.service';

describe('TypesalleService', () => {
  let service: TypesalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypesalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

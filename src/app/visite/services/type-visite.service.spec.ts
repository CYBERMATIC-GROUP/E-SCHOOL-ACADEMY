import { TestBed } from '@angular/core/testing';

import { TypeVisiteService } from './type-visite.service';

describe('TypeVisiteService', () => {
  let service: TypeVisiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeVisiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

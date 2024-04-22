import { TestBed } from '@angular/core/testing';

import { NotifiactionService } from './notifiaction.service';

describe('NotifiactionService', () => {
  let service: NotifiactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifiactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { EnvoiemailService } from './envoiemail.service';

describe('EnvoiemailService', () => {
  let service: EnvoiemailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvoiemailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

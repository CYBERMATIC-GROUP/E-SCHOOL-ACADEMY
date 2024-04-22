import { TestBed } from '@angular/core/testing';

import { EtatsanitaireService } from './etatsanitaire.service';

describe('EtatsanitaireService', () => {
  let service: EtatsanitaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtatsanitaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

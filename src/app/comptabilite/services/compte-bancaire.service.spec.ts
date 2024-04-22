import { TestBed } from '@angular/core/testing';

import { CompteBancaireService } from './compte-bancaire.service';

describe('CompteBancaireService', () => {
  let service: CompteBancaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompteBancaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

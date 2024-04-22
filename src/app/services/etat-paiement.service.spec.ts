import { TestBed } from '@angular/core/testing';

import { EtatPaiementService } from './etat-paiement.service';

describe('EtatPaiementService', () => {
  let service: EtatPaiementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtatPaiementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

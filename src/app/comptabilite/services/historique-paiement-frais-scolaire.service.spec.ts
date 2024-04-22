import { TestBed } from '@angular/core/testing';

import { HistoriquePaiementFraisScolaireService } from './historique-paiement-frais-scolaire.service';

describe('HistoriquePaiementFraisScolaireService', () => {
  let service: HistoriquePaiementFraisScolaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoriquePaiementFraisScolaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ListeFraisScolaireService } from './liste-frais-scolaire.service';

describe('ListeFraisScolaireService', () => {
  let service: ListeFraisScolaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeFraisScolaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

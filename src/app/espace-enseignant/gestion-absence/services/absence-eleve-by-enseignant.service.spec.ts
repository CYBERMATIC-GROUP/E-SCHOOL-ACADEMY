import { TestBed } from '@angular/core/testing';

import { AbsenceEleveByEnseignantService } from './absence-eleve-by-enseignant.service';

describe('AbsenceEleveByEnseignantService', () => {
  let service: AbsenceEleveByEnseignantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsenceEleveByEnseignantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

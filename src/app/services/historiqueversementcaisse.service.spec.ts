import { TestBed } from '@angular/core/testing';

import { HistoriqueversementcaisseService } from './historiqueversementcaisse.service';

describe('HistoriqueversementcaisseService', () => {
  let service: HistoriqueversementcaisseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoriqueversementcaisseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

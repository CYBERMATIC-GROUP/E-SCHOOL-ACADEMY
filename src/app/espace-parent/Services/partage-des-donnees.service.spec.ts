import { TestBed } from '@angular/core/testing';

import { PartageDesDonneesService } from './partage-des-donnees.service';

describe('PartageDesDonneesService', () => {
  let service: PartageDesDonneesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartageDesDonneesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { EtablissementTousService } from './etablissement-tous.service';

describe('EtablissementTousService', () => {
  let service: EtablissementTousService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtablissementTousService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

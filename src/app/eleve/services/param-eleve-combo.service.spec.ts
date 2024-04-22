import { TestBed } from '@angular/core/testing';

import { ParamEleveComboService } from './param-eleve-combo.service';

describe('ParamEleveComboService', () => {
  let service: ParamEleveComboService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParamEleveComboService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ImprimeCarteAgentEnesignantService } from './imprime-carte-agent-enesignant.service';

describe('ImprimeCarteAgentEnesignantService', () => {
  let service: ImprimeCarteAgentEnesignantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImprimeCarteAgentEnesignantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

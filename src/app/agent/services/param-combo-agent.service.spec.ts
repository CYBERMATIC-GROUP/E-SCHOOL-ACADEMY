import { TestBed } from '@angular/core/testing';

import { ParamComboAgentService } from './param-combo-agent.service';

describe('ParamComboAgentService', () => {
  let service: ParamComboAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParamComboAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

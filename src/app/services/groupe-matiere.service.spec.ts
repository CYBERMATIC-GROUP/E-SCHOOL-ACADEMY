import { TestBed } from '@angular/core/testing';

import { GroupeMatiereService } from './groupe-matiere.service';

describe('GroupeMatiereService', () => {
  let service: GroupeMatiereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupeMatiereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

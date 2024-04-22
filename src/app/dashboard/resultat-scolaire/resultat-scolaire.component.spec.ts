import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatScolaireComponent } from './resultat-scolaire.component';

describe('ResultatScolaireComponent', () => {
  let component: ResultatScolaireComponent;
  let fixture: ComponentFixture<ResultatScolaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultatScolaireComponent]
    });
    fixture = TestBed.createComponent(ResultatScolaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

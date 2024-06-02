import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquepaiementEleveInscritComponent } from './historiquepaiement-eleve-inscrit.component';

describe('HistoriquepaiementEleveInscritComponent', () => {
  let component: HistoriquepaiementEleveInscritComponent;
  let fixture: ComponentFixture<HistoriquepaiementEleveInscritComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriquepaiementEleveInscritComponent]
    });
    fixture = TestBed.createComponent(HistoriquepaiementEleveInscritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

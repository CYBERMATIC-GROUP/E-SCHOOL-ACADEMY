import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueVersementCaisseComponent } from './historique-versement-caisse.component';

describe('HistoriqueVersementCaisseComponent', () => {
  let component: HistoriqueVersementCaisseComponent;
  let fixture: ComponentFixture<HistoriqueVersementCaisseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriqueVersementCaisseComponent]
    });
    fixture = TestBed.createComponent(HistoriqueVersementCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementFraisScolaireComponent } from './paiement-frais-scolaire.component';

describe('PaiementFraisScolaireComponent', () => {
  let component: PaiementFraisScolaireComponent;
  let fixture: ComponentFixture<PaiementFraisScolaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaiementFraisScolaireComponent]
    });
    fixture = TestBed.createComponent(PaiementFraisScolaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

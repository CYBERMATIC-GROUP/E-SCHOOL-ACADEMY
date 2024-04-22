import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatPaiementComponent } from './etat-paiement.component';

describe('EtatPaiementComponent', () => {
  let component: EtatPaiementComponent;
  let fixture: ComponentFixture<EtatPaiementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtatPaiementComponent]
    });
    fixture = TestBed.createComponent(EtatPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

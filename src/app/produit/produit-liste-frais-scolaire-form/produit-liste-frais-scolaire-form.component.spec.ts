import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitListeFraisScolaireFormComponent } from './produit-liste-frais-scolaire-form.component';

describe('ProduitListeFraisScolaireFormComponent', () => {
  let component: ProduitListeFraisScolaireFormComponent;
  let fixture: ComponentFixture<ProduitListeFraisScolaireFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProduitListeFraisScolaireFormComponent]
    });
    fixture = TestBed.createComponent(ProduitListeFraisScolaireFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

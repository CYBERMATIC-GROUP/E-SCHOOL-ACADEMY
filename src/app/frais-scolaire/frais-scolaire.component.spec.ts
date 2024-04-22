import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraisScolaireComponent } from './frais-scolaire.component';

describe('FraisScolaireComponent', () => {
  let component: FraisScolaireComponent;
  let fixture: ComponentFixture<FraisScolaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FraisScolaireComponent]
    });
    fixture = TestBed.createComponent(FraisScolaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

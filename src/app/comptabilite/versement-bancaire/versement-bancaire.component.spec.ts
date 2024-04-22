import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersementBancaireComponent } from './versement-bancaire.component';

describe('VersementBancaireComponent', () => {
  let component: VersementBancaireComponent;
  let fixture: ComponentFixture<VersementBancaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VersementBancaireComponent]
    });
    fixture = TestBed.createComponent(VersementBancaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

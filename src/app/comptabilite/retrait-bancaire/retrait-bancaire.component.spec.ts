import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetraitBancaireComponent } from './retrait-bancaire.component';

describe('RetraitBancaireComponent', () => {
  let component: RetraitBancaireComponent;
  let fixture: ComponentFixture<RetraitBancaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetraitBancaireComponent]
    });
    fixture = TestBed.createComponent(RetraitBancaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

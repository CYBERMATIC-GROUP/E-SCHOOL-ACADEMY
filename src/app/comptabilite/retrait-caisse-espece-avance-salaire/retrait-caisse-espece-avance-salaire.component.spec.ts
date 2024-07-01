import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetraitCaisseEspeceAvanceSalaireComponent } from './retrait-caisse-espece-avance-salaire.component';

describe('RetraitCaisseEspeceAvanceSalaireComponent', () => {
  let component: RetraitCaisseEspeceAvanceSalaireComponent;
  let fixture: ComponentFixture<RetraitCaisseEspeceAvanceSalaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetraitCaisseEspeceAvanceSalaireComponent]
    });
    fixture = TestBed.createComponent(RetraitCaisseEspeceAvanceSalaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

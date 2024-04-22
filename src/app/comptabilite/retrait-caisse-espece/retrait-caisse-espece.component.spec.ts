import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetraitCaisseEspeceComponent } from './retrait-caisse-espece.component';

describe('RetraitCaisseEspeceComponent', () => {
  let component: RetraitCaisseEspeceComponent;
  let fixture: ComponentFixture<RetraitCaisseEspeceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetraitCaisseEspeceComponent]
    });
    fixture = TestBed.createComponent(RetraitCaisseEspeceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

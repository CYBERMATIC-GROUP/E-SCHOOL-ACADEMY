import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutilsDuPromoteurComponent } from './outils-du-promoteur.component';

describe('OutilsDuPromoteurComponent', () => {
  let component: OutilsDuPromoteurComponent;
  let fixture: ComponentFixture<OutilsDuPromoteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutilsDuPromoteurComponent]
    });
    fixture = TestBed.createComponent(OutilsDuPromoteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReabonnementEleveComponent } from './reabonnement-eleve.component';

describe('ReabonnementEleveComponent', () => {
  let component: ReabonnementEleveComponent;
  let fixture: ComponentFixture<ReabonnementEleveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReabonnementEleveComponent]
    });
    fixture = TestBed.createComponent(ReabonnementEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

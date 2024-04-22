import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAbsenceComponent } from './gestion-absence.component';

describe('GestionAbsenceComponent', () => {
  let component: GestionAbsenceComponent;
  let fixture: ComponentFixture<GestionAbsenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionAbsenceComponent]
    });
    fixture = TestBed.createComponent(GestionAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

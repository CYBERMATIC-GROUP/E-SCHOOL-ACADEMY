import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceEleveComponent } from './absence-eleve.component';

describe('AbsenceEleveComponent', () => {
  let component: AbsenceEleveComponent;
  let fixture: ComponentFixture<AbsenceEleveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbsenceEleveComponent]
    });
    fixture = TestBed.createComponent(AbsenceEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

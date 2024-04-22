import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationNotesEleveByParentComponent } from './consultation-notes-eleve-by-parent.component';

describe('ConsultationNotesEleveByParentComponent', () => {
  let component: ConsultationNotesEleveByParentComponent;
  let fixture: ComponentFixture<ConsultationNotesEleveByParentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultationNotesEleveByParentComponent]
    });
    fixture = TestBed.createComponent(ConsultationNotesEleveByParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationNoteComponent } from './consultation-note.component';

describe('ConsultationNoteComponent', () => {
  let component: ConsultationNoteComponent;
  let fixture: ComponentFixture<ConsultationNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultationNoteComponent]
    });
    fixture = TestBed.createComponent(ConsultationNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

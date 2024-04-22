import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationNotesMatiereFormComponent } from './observation-notes-matiere-form.component';

describe('ObservationNotesMatiereFormComponent', () => {
  let component: ObservationNotesMatiereFormComponent;
  let fixture: ComponentFixture<ObservationNotesMatiereFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObservationNotesMatiereFormComponent]
    });
    fixture = TestBed.createComponent(ObservationNotesMatiereFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObsertionsNotesMatiereComponent } from './obsertions-notes-matiere.component';

describe('ObsertionsNotesMatiereComponent', () => {
  let component: ObsertionsNotesMatiereComponent;
  let fixture: ComponentFixture<ObsertionsNotesMatiereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObsertionsNotesMatiereComponent]
    });
    fixture = TestBed.createComponent(ObsertionsNotesMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

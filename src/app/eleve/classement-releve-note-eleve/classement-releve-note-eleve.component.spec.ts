import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassementReleveNoteEleveComponent } from './classement-releve-note-eleve.component';

describe('ClassementReleveNoteEleveComponent', () => {
  let component: ClassementReleveNoteEleveComponent;
  let fixture: ComponentFixture<ClassementReleveNoteEleveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassementReleveNoteEleveComponent]
    });
    fixture = TestBed.createComponent(ClassementReleveNoteEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

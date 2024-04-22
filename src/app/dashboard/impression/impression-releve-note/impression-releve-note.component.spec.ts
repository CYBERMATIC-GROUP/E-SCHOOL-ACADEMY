import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressionReleveNoteComponent } from './impression-releve-note.component';

describe('ImpressionReleveNoteComponent', () => {
  let component: ImpressionReleveNoteComponent;
  let fixture: ComponentFixture<ImpressionReleveNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImpressionReleveNoteComponent]
    });
    fixture = TestBed.createComponent(ImpressionReleveNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

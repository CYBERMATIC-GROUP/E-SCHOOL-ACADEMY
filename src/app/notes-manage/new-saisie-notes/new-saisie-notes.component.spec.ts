import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSaisieNotesComponent } from './new-saisie-notes.component';

describe('NewSaisieNotesComponent', () => {
  let component: NewSaisieNotesComponent;
  let fixture: ComponentFixture<NewSaisieNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewSaisieNotesComponent]
    });
    fixture = TestBed.createComponent(NewSaisieNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

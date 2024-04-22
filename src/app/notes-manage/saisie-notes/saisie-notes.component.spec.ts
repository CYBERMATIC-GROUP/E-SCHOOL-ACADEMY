import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisieNotesComponent } from './saisie-notes.component';

describe('SaisieNotesComponent', () => {
  let component: SaisieNotesComponent;
  let fixture: ComponentFixture<SaisieNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaisieNotesComponent]
    });
    fixture = TestBed.createComponent(SaisieNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

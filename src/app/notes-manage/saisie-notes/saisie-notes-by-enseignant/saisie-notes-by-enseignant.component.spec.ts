import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisieNotesByEnseignantComponent } from './saisie-notes-by-enseignant.component';

describe('SaisieNotesByEnseignantComponent', () => {
  let component: SaisieNotesByEnseignantComponent;
  let fixture: ComponentFixture<SaisieNotesByEnseignantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaisieNotesByEnseignantComponent]
    });
    fixture = TestBed.createComponent(SaisieNotesByEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

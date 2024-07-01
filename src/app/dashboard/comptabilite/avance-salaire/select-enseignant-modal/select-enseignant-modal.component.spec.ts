import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEnseignantModalComponent } from './select-enseignant-modal.component';

describe('SelectEnseignantModalComponent', () => {
  let component: SelectEnseignantModalComponent;
  let fixture: ComponentFixture<SelectEnseignantModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectEnseignantModalComponent]
    });
    fixture = TestBed.createComponent(SelectEnseignantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

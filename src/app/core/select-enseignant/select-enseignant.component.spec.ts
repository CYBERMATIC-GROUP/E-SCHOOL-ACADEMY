import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEnseignantComponent } from './select-enseignant.component';

describe('SelectEnseignantComponent', () => {
  let component: SelectEnseignantComponent;
  let fixture: ComponentFixture<SelectEnseignantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectEnseignantComponent]
    });
    fixture = TestBed.createComponent(SelectEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

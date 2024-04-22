import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseEnseignantComponent } from './choose-enseignant.component';

describe('ChooseEnseignantComponent', () => {
  let component: ChooseEnseignantComponent;
  let fixture: ComponentFixture<ChooseEnseignantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseEnseignantComponent]
    });
    fixture = TestBed.createComponent(ChooseEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

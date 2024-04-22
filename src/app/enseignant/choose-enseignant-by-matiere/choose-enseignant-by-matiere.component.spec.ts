import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseEnseignantByMatiereComponent } from './choose-enseignant-by-matiere.component';

describe('ChooseEnseignantByMatiereComponent', () => {
  let component: ChooseEnseignantByMatiereComponent;
  let fixture: ComponentFixture<ChooseEnseignantByMatiereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseEnseignantByMatiereComponent]
    });
    fixture = TestBed.createComponent(ChooseEnseignantByMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

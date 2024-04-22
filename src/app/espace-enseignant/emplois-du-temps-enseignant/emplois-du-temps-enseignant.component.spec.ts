import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploisDuTempsEnseignantComponent } from './emplois-du-temps-enseignant.component';

describe('EmploisDuTempsEnseignantComponent', () => {
  let component: EmploisDuTempsEnseignantComponent;
  let fixture: ComponentFixture<EmploisDuTempsEnseignantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmploisDuTempsEnseignantComponent]
    });
    fixture = TestBed.createComponent(EmploisDuTempsEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointageEnseignantComponent } from './pointage-enseignant.component';

describe('PointageEnseignantComponent', () => {
  let component: PointageEnseignantComponent;
  let fixture: ComponentFixture<PointageEnseignantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PointageEnseignantComponent]
    });
    fixture = TestBed.createComponent(PointageEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

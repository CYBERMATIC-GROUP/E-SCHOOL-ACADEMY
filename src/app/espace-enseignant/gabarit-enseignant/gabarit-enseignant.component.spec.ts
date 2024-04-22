import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GabaritEnseignantComponent } from './gabarit-enseignant.component';

describe('GabaritEnseignantComponent', () => {
  let component: GabaritEnseignantComponent;
  let fixture: ComponentFixture<GabaritEnseignantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GabaritEnseignantComponent]
    });
    fixture = TestBed.createComponent(GabaritEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

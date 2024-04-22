import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressionCarteEnseignantComponent } from './impression-carte-enseignant.component';

describe('ImpressionCarteEnseignantComponent', () => {
  let component: ImpressionCarteEnseignantComponent;
  let fixture: ComponentFixture<ImpressionCarteEnseignantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImpressionCarteEnseignantComponent]
    });
    fixture = TestBed.createComponent(ImpressionCarteEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

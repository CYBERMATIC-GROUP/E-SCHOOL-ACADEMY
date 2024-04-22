import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatiereEnseigneComponent } from './matiere-enseigne.component';

describe('MatiereEnseigneComponent', () => {
  let component: MatiereEnseigneComponent;
  let fixture: ComponentFixture<MatiereEnseigneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatiereEnseigneComponent]
    });
    fixture = TestBed.createComponent(MatiereEnseigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

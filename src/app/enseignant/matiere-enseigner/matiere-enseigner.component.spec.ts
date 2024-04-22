import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatiereEnseignerComponent } from './matiere-enseigner.component';

describe('MatiereEnseignerComponent', () => {
  let component: MatiereEnseignerComponent;
  let fixture: ComponentFixture<MatiereEnseignerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatiereEnseignerComponent]
    });
    fixture = TestBed.createComponent(MatiereEnseignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

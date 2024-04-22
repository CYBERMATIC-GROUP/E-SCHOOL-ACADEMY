import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseMatiereEnseigneeComponent } from './choose-matiere-enseignee.component';

describe('ChooseMatiereEnseigneeComponent', () => {
  let component: ChooseMatiereEnseigneeComponent;
  let fixture: ComponentFixture<ChooseMatiereEnseigneeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseMatiereEnseigneeComponent]
    });
    fixture = TestBed.createComponent(ChooseMatiereEnseigneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

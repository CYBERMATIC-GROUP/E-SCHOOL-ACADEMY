import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GabarieEleveComponent } from './gabarie-eleve.component';

describe('GabarieEleveComponent', () => {
  let component: GabarieEleveComponent;
  let fixture: ComponentFixture<GabarieEleveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GabarieEleveComponent]
    });
    fixture = TestBed.createComponent(GabarieEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

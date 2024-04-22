import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiationEleveComponent } from './radiation-eleve.component';

describe('RadiationEleveComponent', () => {
  let component: RadiationEleveComponent;
  let fixture: ComponentFixture<RadiationEleveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RadiationEleveComponent]
    });
    fixture = TestBed.createComponent(RadiationEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

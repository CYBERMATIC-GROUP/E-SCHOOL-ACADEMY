import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GabaritComponent } from './gabarit.component';

describe('GabaritComponent', () => {
  let component: GabaritComponent;
  let fixture: ComponentFixture<GabaritComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GabaritComponent]
    });
    fixture = TestBed.createComponent(GabaritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

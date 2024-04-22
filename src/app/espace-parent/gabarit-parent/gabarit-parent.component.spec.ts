import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GabaritParentComponent } from './gabarit-parent.component';

describe('GabaritParentComponent', () => {
  let component: GabaritParentComponent;
  let fixture: ComponentFixture<GabaritParentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GabaritParentComponent]
    });
    fixture = TestBed.createComponent(GabaritParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

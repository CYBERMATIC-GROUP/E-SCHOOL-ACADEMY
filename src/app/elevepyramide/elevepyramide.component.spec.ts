import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevepyramideComponent } from './elevepyramide.component';

describe('ElevepyramideComponent', () => {
  let component: ElevepyramideComponent;
  let fixture: ComponentFixture<ElevepyramideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElevepyramideComponent]
    });
    fixture = TestBed.createComponent(ElevepyramideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

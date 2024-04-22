import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReductionExonerationComponent } from './reduction-exoneration.component';

describe('ReductionExonerationComponent', () => {
  let component: ReductionExonerationComponent;
  let fixture: ComponentFixture<ReductionExonerationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReductionExonerationComponent]
    });
    fixture = TestBed.createComponent(ReductionExonerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

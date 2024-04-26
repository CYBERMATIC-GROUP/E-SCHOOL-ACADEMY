import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsOperationsComponent } from './options-operations.component';

describe('OptionsOperationsComponent', () => {
  let component: OptionsOperationsComponent;
  let fixture: ComponentFixture<OptionsOperationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionsOperationsComponent]
    });
    fixture = TestBed.createComponent(OptionsOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

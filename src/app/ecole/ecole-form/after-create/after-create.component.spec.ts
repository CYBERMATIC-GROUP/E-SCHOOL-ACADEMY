import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterCreateComponent } from './after-create.component';

describe('AfterCreateComponent', () => {
  let component: AfterCreateComponent;
  let fixture: ComponentFixture<AfterCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AfterCreateComponent]
    });
    fixture = TestBed.createComponent(AfterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratenewpasswordComponent } from './generatenewpassword.component';

describe('GeneratenewpasswordComponent', () => {
  let component: GeneratenewpasswordComponent;
  let fixture: ComponentFixture<GeneratenewpasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneratenewpasswordComponent]
    });
    fixture = TestBed.createComponent(GeneratenewpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

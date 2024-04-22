import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatuseleveComponent } from './statuseleve.component';

describe('StatuseleveComponent', () => {
  let component: StatuseleveComponent;
  let fixture: ComponentFixture<StatuseleveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatuseleveComponent]
    });
    fixture = TestBed.createComponent(StatuseleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

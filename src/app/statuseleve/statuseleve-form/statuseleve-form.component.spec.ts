import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatuseleveFormComponent } from './statuseleve-form.component';

describe('StatuseleveFormComponent', () => {
  let component: StatuseleveFormComponent;
  let fixture: ComponentFixture<StatuseleveFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatuseleveFormComponent]
    });
    fixture = TestBed.createComponent(StatuseleveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

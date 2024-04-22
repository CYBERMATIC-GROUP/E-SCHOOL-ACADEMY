import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursFormComponent } from './cours-form.component';

describe('CoursFormComponent', () => {
  let component: CoursFormComponent;
  let fixture: ComponentFixture<CoursFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursFormComponent]
    });
    fixture = TestBed.createComponent(CoursFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

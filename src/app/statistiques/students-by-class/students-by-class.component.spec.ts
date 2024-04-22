import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsByClassComponent } from './students-by-class.component';

describe('StudentsByClassComponent', () => {
  let component: StudentsByClassComponent;
  let fixture: ComponentFixture<StudentsByClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentsByClassComponent]
    });
    fixture = TestBed.createComponent(StudentsByClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeFormComponent } from './grade-form.component';

describe('GradeFormComponent', () => {
  let component: GradeFormComponent;
  let fixture: ComponentFixture<GradeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GradeFormComponent]
    });
    fixture = TestBed.createComponent(GradeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

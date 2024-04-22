import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectifFormComponent } from './objectif-form.component';

describe('ObjectifFormComponent', () => {
  let component: ObjectifFormComponent;
  let fixture: ComponentFixture<ObjectifFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectifFormComponent]
    });
    fixture = TestBed.createComponent(ObjectifFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

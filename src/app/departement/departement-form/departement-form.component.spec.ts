import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartementFormComponent } from './departement-form.component';

describe('DepartementFormComponent', () => {
  let component: DepartementFormComponent;
  let fixture: ComponentFixture<DepartementFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartementFormComponent]
    });
    fixture = TestBed.createComponent(DepartementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreexamenFormComponent } from './centreexamen-form.component';

describe('CentreexamenFormComponent', () => {
  let component: CentreexamenFormComponent;
  let fixture: ComponentFixture<CentreexamenFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CentreexamenFormComponent]
    });
    fixture = TestBed.createComponent(CentreexamenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

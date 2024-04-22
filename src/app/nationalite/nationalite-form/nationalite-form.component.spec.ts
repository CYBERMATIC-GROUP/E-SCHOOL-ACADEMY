import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationaliteFormComponent } from './nationalite-form.component';

describe('NationaliteFormComponent', () => {
  let component: NationaliteFormComponent;
  let fixture: ComponentFixture<NationaliteFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NationaliteFormComponent]
    });
    fixture = TestBed.createComponent(NationaliteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

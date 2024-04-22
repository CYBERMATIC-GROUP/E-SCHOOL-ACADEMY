import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbenceFormComponent } from './abence-form.component';

describe('AbenceFormComponent', () => {
  let component: AbenceFormComponent;
  let fixture: ComponentFixture<AbenceFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbenceFormComponent]
    });
    fixture = TestBed.createComponent(AbenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

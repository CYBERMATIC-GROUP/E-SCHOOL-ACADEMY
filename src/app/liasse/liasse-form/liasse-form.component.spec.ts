import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiasseFormComponent } from './liasse-form.component';

describe('LiasseFormComponent', () => {
  let component: LiasseFormComponent;
  let fixture: ComponentFixture<LiasseFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiasseFormComponent]
    });
    fixture = TestBed.createComponent(LiasseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

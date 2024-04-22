import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrondissementFormComponent } from './arrondissement-form.component';

describe('ArrondissementFormComponent', () => {
  let component: ArrondissementFormComponent;
  let fixture: ComponentFixture<ArrondissementFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArrondissementFormComponent]
    });
    fixture = TestBed.createComponent(ArrondissementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

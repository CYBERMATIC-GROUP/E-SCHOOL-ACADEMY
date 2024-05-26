import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsDeConsultationsComponent } from './operations-de-consultations.component';

describe('OperationsDeConsultationsComponent', () => {
  let component: OperationsDeConsultationsComponent;
  let fixture: ComponentFixture<OperationsDeConsultationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperationsDeConsultationsComponent]
    });
    fixture = TestBed.createComponent(OperationsDeConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

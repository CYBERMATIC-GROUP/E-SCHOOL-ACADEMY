import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsDiversesComponent } from './operations-diverses.component';

describe('OperationsDiversesComponent', () => {
  let component: OperationsDiversesComponent;
  let fixture: ComponentFixture<OperationsDiversesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperationsDiversesComponent]
    });
    fixture = TestBed.createComponent(OperationsDiversesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

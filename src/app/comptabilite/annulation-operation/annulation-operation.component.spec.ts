import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnulationOperationComponent } from './annulation-operation.component';

describe('AnnulationOperationComponent', () => {
  let component: AnnulationOperationComponent;
  let fixture: ComponentFixture<AnnulationOperationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnulationOperationComponent]
    });
    fixture = TestBed.createComponent(AnnulationOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsDeSaisieComponent } from './operations-de-saisie.component';

describe('OperationsDeSaisieComponent', () => {
  let component: OperationsDeSaisieComponent;
  let fixture: ComponentFixture<OperationsDeSaisieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperationsDeSaisieComponent]
    });
    fixture = TestBed.createComponent(OperationsDeSaisieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

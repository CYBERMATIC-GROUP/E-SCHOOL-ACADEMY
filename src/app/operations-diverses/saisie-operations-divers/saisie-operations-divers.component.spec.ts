import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisieOperationsDiversComponent } from './saisie-operations-divers.component';

describe('SaisieOperationsDiversComponent', () => {
  let component: SaisieOperationsDiversComponent;
  let fixture: ComponentFixture<SaisieOperationsDiversComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaisieOperationsDiversComponent]
    });
    fixture = TestBed.createComponent(SaisieOperationsDiversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

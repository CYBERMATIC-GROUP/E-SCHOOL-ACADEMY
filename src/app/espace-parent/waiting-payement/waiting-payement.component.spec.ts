import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingPayementComponent } from './waiting-payement.component';

describe('WaitingPayementComponent', () => {
  let component: WaitingPayementComponent;
  let fixture: ComponentFixture<WaitingPayementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaitingPayementComponent]
    });
    fixture = TestBed.createComponent(WaitingPayementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpayComponent } from './epay.component';

describe('EpayComponent', () => {
  let component: EpayComponent;
  let fixture: ComponentFixture<EpayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EpayComponent]
    });
    fixture = TestBed.createComponent(EpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

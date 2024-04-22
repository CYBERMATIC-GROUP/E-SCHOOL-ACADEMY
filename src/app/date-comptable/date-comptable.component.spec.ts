import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateComptableComponent } from './date-comptable.component';

describe('DateComptableComponent', () => {
  let component: DateComptableComponent;
  let fixture: ComponentFixture<DateComptableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateComptableComponent]
    });
    fixture = TestBed.createComponent(DateComptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

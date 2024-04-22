import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoisSmsComponent } from './envois-sms.component';

describe('EnvoisSmsComponent', () => {
  let component: EnvoisSmsComponent;
  let fixture: ComponentFixture<EnvoisSmsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnvoisSmsComponent]
    });
    fixture = TestBed.createComponent(EnvoisSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

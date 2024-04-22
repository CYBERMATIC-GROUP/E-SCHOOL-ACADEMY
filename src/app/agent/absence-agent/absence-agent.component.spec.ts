import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceAgentComponent } from './absence-agent.component';

describe('AbsenceAgentComponent', () => {
  let component: AbsenceAgentComponent;
  let fixture: ComponentFixture<AbsenceAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbsenceAgentComponent]
    });
    fixture = TestBed.createComponent(AbsenceAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

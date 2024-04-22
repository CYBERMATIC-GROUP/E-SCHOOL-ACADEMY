import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutAbsenceAgentComponent } from './ajout-absence-agent.component';

describe('AjoutAbsenceAgentComponent', () => {
  let component: AjoutAbsenceAgentComponent;
  let fixture: ComponentFixture<AjoutAbsenceAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutAbsenceAgentComponent]
    });
    fixture = TestBed.createComponent(AjoutAbsenceAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

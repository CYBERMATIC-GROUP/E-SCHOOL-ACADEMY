import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointageAgentComponent } from './pointage-agent.component';

describe('PointageAgentComponent', () => {
  let component: PointageAgentComponent;
  let fixture: ComponentFixture<PointageAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PointageAgentComponent]
    });
    fixture = TestBed.createComponent(PointageAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

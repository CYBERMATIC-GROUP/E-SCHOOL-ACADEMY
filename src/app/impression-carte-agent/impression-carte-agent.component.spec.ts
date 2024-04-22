import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressionCarteAgentComponent } from './impression-carte-agent.component';

describe('ImpressionCarteAgentComponent', () => {
  let component: ImpressionCarteAgentComponent;
  let fixture: ComponentFixture<ImpressionCarteAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImpressionCarteAgentComponent]
    });
    fixture = TestBed.createComponent(ImpressionCarteAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

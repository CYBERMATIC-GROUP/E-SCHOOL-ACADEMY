import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAgentModalComponent } from './select-agent-modal.component';

describe('SelectAgentModalComponent', () => {
  let component: SelectAgentModalComponent;
  let fixture: ComponentFixture<SelectAgentModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectAgentModalComponent]
    });
    fixture = TestBed.createComponent(SelectAgentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAgentComponent } from './liste-agent.component';

describe('ListeAgentComponent', () => {
  let component: ListeAgentComponent;
  let fixture: ComponentFixture<ListeAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeAgentComponent]
    });
    fixture = TestBed.createComponent(ListeAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

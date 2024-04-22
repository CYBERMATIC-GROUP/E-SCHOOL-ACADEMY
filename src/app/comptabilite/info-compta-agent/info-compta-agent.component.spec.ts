import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoComptaAgentComponent } from './info-compta-agent.component';

describe('InfoComptaAgentComponent', () => {
  let component: InfoComptaAgentComponent;
  let fixture: ComponentFixture<InfoComptaAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoComptaAgentComponent]
    });
    fixture = TestBed.createComponent(InfoComptaAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

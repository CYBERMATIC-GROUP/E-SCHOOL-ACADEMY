import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheAgentComponent } from './fiche-agent.component';

describe('FicheAgentComponent', () => {
  let component: FicheAgentComponent;
  let fixture: ComponentFixture<FicheAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FicheAgentComponent]
    });
    fixture = TestBed.createComponent(FicheAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

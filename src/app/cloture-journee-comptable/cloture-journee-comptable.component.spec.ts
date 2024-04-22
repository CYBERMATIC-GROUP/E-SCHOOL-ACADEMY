import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClotureJourneeComptableComponent } from './cloture-journee-comptable.component';

describe('ClotureJourneeComptableComponent', () => {
  let component: ClotureJourneeComptableComponent;
  let fixture: ComponentFixture<ClotureJourneeComptableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClotureJourneeComptableComponent]
    });
    fixture = TestBed.createComponent(ClotureJourneeComptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

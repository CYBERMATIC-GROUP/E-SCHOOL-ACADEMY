import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrimestreSequenceComponent } from './trimestre-sequence.component';

describe('TrimestreSequenceComponent', () => {
  let component: TrimestreSequenceComponent;
  let fixture: ComponentFixture<TrimestreSequenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrimestreSequenceComponent]
    });
    fixture = TestBed.createComponent(TrimestreSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

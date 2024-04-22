import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsNotesComponent } from './stats-notes.component';

describe('StatsNotesComponent', () => {
  let component: StatsNotesComponent;
  let fixture: ComponentFixture<StatsNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatsNotesComponent]
    });
    fixture = TestBed.createComponent(StatsNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

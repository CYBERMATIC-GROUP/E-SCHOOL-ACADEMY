import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleveGlobalNotesComponent } from './releve-global-notes.component';

describe('ReleveGlobalNotesComponent', () => {
  let component: ReleveGlobalNotesComponent;
  let fixture: ComponentFixture<ReleveGlobalNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReleveGlobalNotesComponent]
    });
    fixture = TestBed.createComponent(ReleveGlobalNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

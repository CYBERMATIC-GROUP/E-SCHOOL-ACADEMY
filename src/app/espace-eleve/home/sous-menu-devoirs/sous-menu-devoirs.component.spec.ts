import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousMenuDevoirsComponent } from './sous-menu-devoirs.component';

describe('SousMenuDevoirsComponent', () => {
  let component: SousMenuDevoirsComponent;
  let fixture: ComponentFixture<SousMenuDevoirsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SousMenuDevoirsComponent]
    });
    fixture = TestBed.createComponent(SousMenuDevoirsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

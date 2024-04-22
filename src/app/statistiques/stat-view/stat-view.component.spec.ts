import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatViewComponent } from './stat-view.component';

describe('StatViewComponent', () => {
  let component: StatViewComponent;
  let fixture: ComponentFixture<StatViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatViewComponent]
    });
    fixture = TestBed.createComponent(StatViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

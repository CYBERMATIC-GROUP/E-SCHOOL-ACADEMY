import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointageGlobalComponent } from './pointage-global.component';

describe('PointageGlobalComponent', () => {
  let component: PointageGlobalComponent;
  let fixture: ComponentFixture<PointageGlobalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PointageGlobalComponent]
    });
    fixture = TestBed.createComponent(PointageGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

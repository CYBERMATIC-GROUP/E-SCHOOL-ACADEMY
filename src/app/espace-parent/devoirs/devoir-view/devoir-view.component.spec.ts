import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevoirViewComponent } from './devoir-view.component';

describe('DevoirViewComponent', () => {
  let component: DevoirViewComponent;
  let fixture: ComponentFixture<DevoirViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevoirViewComponent]
    });
    fixture = TestBed.createComponent(DevoirViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

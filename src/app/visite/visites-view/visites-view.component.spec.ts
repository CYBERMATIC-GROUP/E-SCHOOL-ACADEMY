import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitesViewComponent } from './visites-view.component';

describe('VisitesViewComponent', () => {
  let component: VisitesViewComponent;
  let fixture: ComponentFixture<VisitesViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitesViewComponent]
    });
    fixture = TestBed.createComponent(VisitesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

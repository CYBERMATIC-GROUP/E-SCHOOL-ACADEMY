import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteurViewComponent } from './visiteur-view.component';

describe('VisiteurViewComponent', () => {
  let component: VisiteurViewComponent;
  let fixture: ComponentFixture<VisiteurViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisiteurViewComponent]
    });
    fixture = TestBed.createComponent(VisiteurViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

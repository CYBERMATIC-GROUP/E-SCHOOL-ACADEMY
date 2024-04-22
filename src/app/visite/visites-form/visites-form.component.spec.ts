import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitesFormComponent } from './visites-form.component';

describe('VisitesFormComponent', () => {
  let component: VisitesFormComponent;
  let fixture: ComponentFixture<VisitesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitesFormComponent]
    });
    fixture = TestBed.createComponent(VisitesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

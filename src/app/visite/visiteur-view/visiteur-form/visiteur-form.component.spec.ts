import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteurFormComponent } from './visiteur-form.component';

describe('VisiteurFormComponent', () => {
  let component: VisiteurFormComponent;
  let fixture: ComponentFixture<VisiteurFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisiteurFormComponent]
    });
    fixture = TestBed.createComponent(VisiteurFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

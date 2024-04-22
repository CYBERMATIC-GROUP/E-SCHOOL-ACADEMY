import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnneeFormComponent } from './annee-form.component';

describe('AnneeFormComponent', () => {
  let component: AnneeFormComponent;
  let fixture: ComponentFixture<AnneeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnneeFormComponent]
    });
    fixture = TestBed.createComponent(AnneeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchelonFormComponent } from './echelon-form.component';

describe('EchelonFormComponent', () => {
  let component: EchelonFormComponent;
  let fixture: ComponentFixture<EchelonFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EchelonFormComponent]
    });
    fixture = TestBed.createComponent(EchelonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

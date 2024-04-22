import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaisseFormComponent } from './caisse-form.component';

describe('CaisseFormComponent', () => {
  let component: CaisseFormComponent;
  let fixture: ComponentFixture<CaisseFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaisseFormComponent]
    });
    fixture = TestBed.createComponent(CaisseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

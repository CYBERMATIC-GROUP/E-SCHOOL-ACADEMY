import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesalleFormComponent } from './typesalle-form.component';

describe('TypesalleFormComponent', () => {
  let component: TypesalleFormComponent;
  let fixture: ComponentFixture<TypesalleFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypesalleFormComponent]
    });
    fixture = TestBed.createComponent(TypesalleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

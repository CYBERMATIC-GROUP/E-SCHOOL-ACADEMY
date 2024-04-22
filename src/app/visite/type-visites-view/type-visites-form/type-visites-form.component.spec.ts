import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeVisitesFormComponent } from './type-visites-form.component';

describe('TypeVisitesFormComponent', () => {
  let component: TypeVisitesFormComponent;
  let fixture: ComponentFixture<TypeVisitesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeVisitesFormComponent]
    });
    fixture = TestBed.createComponent(TypeVisitesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

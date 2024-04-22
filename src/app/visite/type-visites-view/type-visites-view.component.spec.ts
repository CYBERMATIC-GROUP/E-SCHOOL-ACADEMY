import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeVisitesViewComponent } from './type-visites-view.component';

describe('TypeVisitesViewComponent', () => {
  let component: TypeVisitesViewComponent;
  let fixture: ComponentFixture<TypeVisitesViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeVisitesViewComponent]
    });
    fixture = TestBed.createComponent(TypeVisitesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

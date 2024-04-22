import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFraisFormComponent } from './liste-frais-form.component';

describe('ListeFraisFormComponent', () => {
  let component: ListeFraisFormComponent;
  let fixture: ComponentFixture<ListeFraisFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeFraisFormComponent]
    });
    fixture = TestBed.createComponent(ListeFraisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

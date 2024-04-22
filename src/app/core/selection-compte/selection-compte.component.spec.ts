import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionCompteComponent } from './selection-compte.component';

describe('SelectionCompteComponent', () => {
  let component: SelectionCompteComponent;
  let fixture: ComponentFixture<SelectionCompteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectionCompteComponent]
    });
    fixture = TestBed.createComponent(SelectionCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTrimestreComponent } from './select-trimestre.component';

describe('SelectTrimestreComponent', () => {
  let component: SelectTrimestreComponent;
  let fixture: ComponentFixture<SelectTrimestreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectTrimestreComponent]
    });
    fixture = TestBed.createComponent(SelectTrimestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

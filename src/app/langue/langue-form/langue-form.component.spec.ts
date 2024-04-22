import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangueFormComponent } from './langue-form.component';

describe('LangueFormComponent', () => {
  let component: LangueFormComponent;
  let fixture: ComponentFixture<LangueFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LangueFormComponent]
    });
    fixture = TestBed.createComponent(LangueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

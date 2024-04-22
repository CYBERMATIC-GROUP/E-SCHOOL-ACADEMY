import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangueComponent } from './langue.component';

describe('LangueComponent', () => {
  let component: LangueComponent;
  let fixture: ComponentFixture<LangueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LangueComponent]
    });
    fixture = TestBed.createComponent(LangueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

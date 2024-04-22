import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuartierFormComponent } from './quartier-form.component';

describe('QuartierFormComponent', () => {
  let component: QuartierFormComponent;
  let fixture: ComponentFixture<QuartierFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuartierFormComponent]
    });
    fixture = TestBed.createComponent(QuartierFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseigantFormComponent } from './enseigant-form.component';

describe('EnseigantFormComponent', () => {
  let component: EnseigantFormComponent;
  let fixture: ComponentFixture<EnseigantFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnseigantFormComponent]
    });
    fixture = TestBed.createComponent(EnseigantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

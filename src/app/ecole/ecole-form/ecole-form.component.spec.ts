import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoleFormComponent } from './ecole-form.component';

describe('EcoleFormComponent', () => {
  let component: EcoleFormComponent;
  let fixture: ComponentFixture<EcoleFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcoleFormComponent]
    });
    fixture = TestBed.createComponent(EcoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

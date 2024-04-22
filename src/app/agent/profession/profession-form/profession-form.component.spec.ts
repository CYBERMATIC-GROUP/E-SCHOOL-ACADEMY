import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionFormComponent } from './profession-form.component';

describe('ProfessionFormComponent', () => {
  let component: ProfessionFormComponent;
  let fixture: ComponentFixture<ProfessionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessionFormComponent]
    });
    fixture = TestBed.createComponent(ProfessionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

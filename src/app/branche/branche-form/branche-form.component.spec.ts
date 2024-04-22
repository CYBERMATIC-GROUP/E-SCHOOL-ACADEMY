import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrancheFormComponent } from './branche-form.component';

describe('BrancheFormComponent', () => {
  let component: BrancheFormComponent;
  let fixture: ComponentFixture<BrancheFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrancheFormComponent]
    });
    fixture = TestBed.createComponent(BrancheFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

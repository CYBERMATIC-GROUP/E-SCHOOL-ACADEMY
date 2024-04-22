import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FonctionFormComponent } from './fonction-form.component';

describe('FonctionFormComponent', () => {
  let component: FonctionFormComponent;
  let fixture: ComponentFixture<FonctionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FonctionFormComponent]
    });
    fixture = TestBed.createComponent(FonctionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

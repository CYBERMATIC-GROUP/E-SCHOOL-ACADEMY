import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevoirsFormComponent } from './devoirs-form.component';

describe('DevoirsFormComponent', () => {
  let component: DevoirsFormComponent;
  let fixture: ComponentFixture<DevoirsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevoirsFormComponent]
    });
    fixture = TestBed.createComponent(DevoirsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

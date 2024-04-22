import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualiteensFormComponent } from './qualiteens-form.component';

describe('QualiteensFormComponent', () => {
  let component: QualiteensFormComponent;
  let fixture: ComponentFixture<QualiteensFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QualiteensFormComponent]
    });
    fixture = TestBed.createComponent(QualiteensFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualiteensComponent } from './qualiteens.component';

describe('QualiteensComponent', () => {
  let component: QualiteensComponent;
  let fixture: ComponentFixture<QualiteensComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QualiteensComponent]
    });
    fixture = TestBed.createComponent(QualiteensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

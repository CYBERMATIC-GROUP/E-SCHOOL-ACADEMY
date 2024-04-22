import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreexamenComponent } from './centreexamen.component';

describe('CentreexamenComponent', () => {
  let component: CentreexamenComponent;
  let fixture: ComponentFixture<CentreexamenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CentreexamenComponent]
    });
    fixture = TestBed.createComponent(CentreexamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

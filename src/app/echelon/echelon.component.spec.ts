import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchelonComponent } from './echelon.component';

describe('EchelonComponent', () => {
  let component: EchelonComponent;
  let fixture: ComponentFixture<EchelonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EchelonComponent]
    });
    fixture = TestBed.createComponent(EchelonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

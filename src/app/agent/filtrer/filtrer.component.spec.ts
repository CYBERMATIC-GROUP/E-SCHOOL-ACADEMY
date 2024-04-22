import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrerComponent } from './filtrer.component';

describe('FiltrerComponent', () => {
  let component: FiltrerComponent;
  let fixture: ComponentFixture<FiltrerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltrerComponent]
    });
    fixture = TestBed.createComponent(FiltrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevesInscritsFormComponent } from './eleves-inscrits-form.component';

describe('ElevesInscritsFormComponent', () => {
  let component: ElevesInscritsFormComponent;
  let fixture: ComponentFixture<ElevesInscritsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElevesInscritsFormComponent]
    });
    fixture = TestBed.createComponent(ElevesInscritsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

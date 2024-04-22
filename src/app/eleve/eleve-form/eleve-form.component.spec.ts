import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleveFormComponent } from './eleve-form.component';

describe('EleveFormComponent', () => {
  let component: EleveFormComponent;
  let fixture: ComponentFixture<EleveFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EleveFormComponent]
    });
    fixture = TestBed.createComponent(EleveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

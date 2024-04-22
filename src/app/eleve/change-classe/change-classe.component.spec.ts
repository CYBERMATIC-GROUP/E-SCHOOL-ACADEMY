import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeClasseComponent } from './change-classe.component';

describe('ChangeClasseComponent', () => {
  let component: ChangeClasseComponent;
  let fixture: ComponentFixture<ChangeClasseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeClasseComponent]
    });
    fixture = TestBed.createComponent(ChangeClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

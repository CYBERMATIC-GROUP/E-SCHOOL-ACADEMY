import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalForAllComponent } from './modal-for-all.component';

describe('ModalForAllComponent', () => {
  let component: ModalForAllComponent;
  let fixture: ComponentFixture<ModalForAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalForAllComponent]
    });
    fixture = TestBed.createComponent(ModalForAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

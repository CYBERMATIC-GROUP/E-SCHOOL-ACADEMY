import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMotifComponent } from './modal-motif.component';

describe('ModalMotifComponent', () => {
  let component: ModalMotifComponent;
  let fixture: ComponentFixture<ModalMotifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalMotifComponent]
    });
    fixture = TestBed.createComponent(ModalMotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

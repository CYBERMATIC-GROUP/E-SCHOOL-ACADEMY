import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseModalComponent } from './close-modal.component';

describe('CloseModalComponent', () => {
  let component: CloseModalComponent;
  let fixture: ComponentFixture<CloseModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CloseModalComponent]
    });
    fixture = TestBed.createComponent(CloseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

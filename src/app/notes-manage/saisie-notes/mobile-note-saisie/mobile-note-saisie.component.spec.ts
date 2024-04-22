import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNoteSaisieComponent } from './mobile-note-saisie.component';

describe('MobileNoteSaisieComponent', () => {
  let component: MobileNoteSaisieComponent;
  let fixture: ComponentFixture<MobileNoteSaisieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileNoteSaisieComponent]
    });
    fixture = TestBed.createComponent(MobileNoteSaisieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressioncatrteagentenseignantComponent } from './impressioncatrteagentenseignant.component';

describe('ImpressioncatrteagentenseignantComponent', () => {
  let component: ImpressioncatrteagentenseignantComponent;
  let fixture: ComponentFixture<ImpressioncatrteagentenseignantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImpressioncatrteagentenseignantComponent]
    });
    fixture = TestBed.createComponent(ImpressioncatrteagentenseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

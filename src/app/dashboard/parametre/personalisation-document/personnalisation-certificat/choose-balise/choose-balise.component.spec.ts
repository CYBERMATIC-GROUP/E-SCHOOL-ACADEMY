import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseBaliseComponent } from './choose-balise.component';

describe('ChooseBaliseComponent', () => {
  let component: ChooseBaliseComponent;
  let fixture: ComponentFixture<ChooseBaliseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseBaliseComponent]
    });
    fixture = TestBed.createComponent(ChooseBaliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

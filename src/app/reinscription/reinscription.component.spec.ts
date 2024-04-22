import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinscriptionComponent } from './reinscription.component';

describe('ReinscriptionComponent', () => {
  let component: ReinscriptionComponent;
  let fixture: ComponentFixture<ReinscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReinscriptionComponent]
    });
    fixture = TestBed.createComponent(ReinscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

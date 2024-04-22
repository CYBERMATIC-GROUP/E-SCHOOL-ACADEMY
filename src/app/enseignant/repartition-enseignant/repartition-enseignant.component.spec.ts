import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepartitionEnseignantComponent } from './repartition-enseignant.component';

describe('RepartitionEnseignantComponent', () => {
  let component: RepartitionEnseignantComponent;
  let fixture: ComponentFixture<RepartitionEnseignantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepartitionEnseignantComponent]
    });
    fixture = TestBed.createComponent(RepartitionEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

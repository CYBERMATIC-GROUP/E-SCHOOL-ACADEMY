import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertIntercaisseComponent } from './transfert-intercaisse.component';

describe('TransfertIntercaisseComponent', () => {
  let component: TransfertIntercaisseComponent;
  let fixture: ComponentFixture<TransfertIntercaisseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransfertIntercaisseComponent]
    });
    fixture = TestBed.createComponent(TransfertIntercaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

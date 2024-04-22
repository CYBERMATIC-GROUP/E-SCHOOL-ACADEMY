import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCaisseComponent } from './info-caisse.component';

describe('InfoCaisseComponent', () => {
  let component: InfoCaisseComponent;
  let fixture: ComponentFixture<InfoCaisseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoCaisseComponent]
    });
    fixture = TestBed.createComponent(InfoCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

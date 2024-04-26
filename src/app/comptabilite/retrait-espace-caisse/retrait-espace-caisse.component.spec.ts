import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetraitEspaceCaisseComponent } from './retrait-espace-caisse.component';

describe('RetraitEspaceCaisseComponent', () => {
  let component: RetraitEspaceCaisseComponent;
  let fixture: ComponentFixture<RetraitEspaceCaisseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetraitEspaceCaisseComponent]
    });
    fixture = TestBed.createComponent(RetraitEspaceCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

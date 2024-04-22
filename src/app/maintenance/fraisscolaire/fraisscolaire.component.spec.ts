import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraisscolaireComponent } from './fraisscolaire.component';

describe('FraisscolaireComponent', () => {
  let component: FraisscolaireComponent;
  let fixture: ComponentFixture<FraisscolaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FraisscolaireComponent]
    });
    fixture = TestBed.createComponent(FraisscolaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

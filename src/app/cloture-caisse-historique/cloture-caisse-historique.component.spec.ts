import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClotureCaisseHistoriqueComponent } from './cloture-caisse-historique.component';

describe('ClotureCaisseHistoriqueComponent', () => {
  let component: ClotureCaisseHistoriqueComponent;
  let fixture: ComponentFixture<ClotureCaisseHistoriqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClotureCaisseHistoriqueComponent]
    });
    fixture = TestBed.createComponent(ClotureCaisseHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

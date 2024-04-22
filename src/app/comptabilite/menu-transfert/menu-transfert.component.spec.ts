import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTransfertComponent } from './menu-transfert.component';

describe('MenuTransfertComponent', () => {
  let component: MenuTransfertComponent;
  let fixture: ComponentFixture<MenuTransfertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuTransfertComponent]
    });
    fixture = TestBed.createComponent(MenuTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

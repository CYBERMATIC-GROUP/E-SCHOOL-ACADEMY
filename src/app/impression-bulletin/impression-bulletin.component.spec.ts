import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressionBulletinComponent } from './impression-bulletin.component';

describe('ImpressionBulletinComponent', () => {
  let component: ImpressionBulletinComponent;
  let fixture: ComponentFixture<ImpressionBulletinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImpressionBulletinComponent]
    });
    fixture = TestBed.createComponent(ImpressionBulletinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

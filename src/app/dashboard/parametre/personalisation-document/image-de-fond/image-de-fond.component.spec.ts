import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDeFondComponent } from './image-de-fond.component';

describe('ImageDeFondComponent', () => {
  let component: ImageDeFondComponent;
  let fixture: ComponentFixture<ImageDeFondComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageDeFondComponent]
    });
    fixture = TestBed.createComponent(ImageDeFondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
